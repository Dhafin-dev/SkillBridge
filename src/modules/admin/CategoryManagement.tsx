import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, AdminCategory } from '../../shared/services/api/adminService';

export const CategoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getAllCategories().then(data => {
      setCategories(data);
      setIsLoading(false);
    });
  }, []);

  const handleCreateCategory = () => {
    const title = prompt('Enter category name:');
    if (title) {
      // Logic for adding new category via service would go here
      alert('Functionality to be implemented via API');
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">


      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Categories</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage project disciplines and specialization areas.</p>
        </div>
        <button
          onClick={handleCreateCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 h-10 rounded-2xl transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 mb-8 shadow-xs border border-slate-200/80 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl h-11 pl-9 pr-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
          />
        </div>
        <button className="bg-slate-100 text-slate-800 font-semibold text-xs px-4 py-2 rounded-xl h-11 flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <div className="text-center py-10 text-slate-500 font-semibold col-span-full">Loading categories...</div>}
        {!isLoading && categories.length === 0 && <div className="text-center py-10 text-slate-500 font-semibold col-span-full">No categories found.</div>}
        {!isLoading && categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex gap-1">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-slate-900">{cat.name}</h3>
                </div>
                <p className="text-xs text-slate-500 mb-6 min-h-[36px] line-clamp-2">
                  Specialization category.
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                <span className="text-xs font-medium text-slate-500">Active Projects</span>
                <span className="text-xs font-bold bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  {cat.projectCount}
                </span>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};
