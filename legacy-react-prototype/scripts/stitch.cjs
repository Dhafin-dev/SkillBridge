const fs = require('fs');
const path = require('path');

const API_KEY = process.env.STITCH_API_KEY || '';
const STITCH_URL = 'https://stitch.googleapis.com/mcp';

async function callStitch(toolName, args = {}) {
  const payload = {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: args,
    },
  };

  const res = await fetch(STITCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Stitch API error (${res.status}): ${errText}`);
  }

  const json = await res.json();
  if (json.error) {
    throw new Error(`Stitch MCP error: ${json.error.message || JSON.stringify(json.error)}`);
  }

  const result = json.result;
  if (result?.structuredContent) {
    return result.structuredContent;
  }
  if (result?.content && result.content[0]?.text) {
    try {
      return JSON.parse(result.content[0].text);
    } catch {
      return result.content[0].text;
    }
  }
  return result;
}

const stitch = {
  createProject: (title) => callStitch('create_project', { title }),
  listProjects: () => callStitch('list_projects', {}),
  getProject: (projectId) => callStitch('get_project', { projectId }),
  uploadDesignMd: (projectId, designMdContent) => {
    const designMdBase64 = Buffer.from(designMdContent, 'utf-8').toString('base64');
    return callStitch('upload_design_md', { projectId, designMdBase64 });
  },
  createDesignSystemFromDesignMd: (projectId) =>
    callStitch('create_design_system_from_design_md', { projectId }),
  generateScreenFromText: (projectId, prompt, deviceType = 'DESKTOP', modelId = 'GEMINI_3_FLASH') =>
    callStitch('generate_screen_from_text', { projectId, prompt, deviceType, modelId }),
  listScreens: (projectId) => callStitch('list_screens', { projectId }),
  getScreen: (projectId, screenId) => callStitch('get_screen', { projectId, screenId }),
};

// CLI Execution
if (require.main === module) {
  const [,, command, ...cmdArgs] = process.argv;

  (async () => {
    try {
      switch (command) {
        case 'list-projects': {
          const res = await stitch.listProjects();
          console.log(JSON.stringify(res, null, 2));
          break;
        }
        case 'create-project': {
          const title = cmdArgs[0] || 'SkillBridge Academic Hub';
          const res = await stitch.createProject(title);
          console.log('Project created:', JSON.stringify(res, null, 2));
          break;
        }
        case 'upload-design': {
          const [projId, filePath] = cmdArgs;
          if (!projId || !filePath) {
            console.error('Usage: node scripts/stitch.cjs upload-design <projectId> <path-to-DESIGN.md>');
            process.exit(1);
          }
          const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
          console.log(`Uploading DESIGN.md to project ${projId}...`);
          const uploadRes = await stitch.uploadDesignMd(projId, content);
          console.log('Upload result:', JSON.stringify(uploadRes, null, 2));
          console.log('Generating Design System from DESIGN.md...');
          const dsRes = await stitch.createDesignSystemFromDesignMd(projId);
          console.log('Design System generated:', JSON.stringify(dsRes, null, 2));
          break;
        }
        case 'generate-screen': {
          const [projId, prompt, deviceType] = cmdArgs;
          if (!projId || !prompt) {
            console.error('Usage: node scripts/stitch.cjs generate-screen <projectId> "<prompt>" [DESKTOP|MOBILE]');
            process.exit(1);
          }
          console.log(`Generating screen for project ${projId}...`);
          const screenRes = await stitch.generateScreenFromText(projId, prompt, deviceType || 'DESKTOP');
          console.log('Screen generated:', JSON.stringify(screenRes, null, 2));
          break;
        }
        case 'list-screens': {
          const [projId] = cmdArgs;
          if (!projId) {
            console.error('Usage: node scripts/stitch.cjs list-screens <projectId>');
            process.exit(1);
          }
          const screens = await stitch.listScreens(projId);
          console.log('Screens:', JSON.stringify(screens, null, 2));
          break;
        }
        default: {
          console.log(`
Stitch MCP Automation CLI
-------------------------
Commands:
  node scripts/stitch.cjs list-projects
  node scripts/stitch.cjs create-project [title]
  node scripts/stitch.cjs upload-design <projectId> <DESIGN.md>
  node scripts/stitch.cjs generate-screen <projectId> "<prompt>" [DESKTOP|MOBILE]
  node scripts/stitch.cjs list-screens <projectId>
          `);
        }
      }
    } catch (err) {
      console.error('Stitch error:', err.message);
      process.exit(1);
    }
  })();
}

module.exports = stitch;
