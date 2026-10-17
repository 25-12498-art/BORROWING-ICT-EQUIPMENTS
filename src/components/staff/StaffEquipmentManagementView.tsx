import React, { useState } from 'react';
import { Equipment, EquipmentStatus } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';
import { Plus, X } from 'lucide-react';

interface StaffEquipmentManagementViewProps {
  equipmentList: Equipment[];
  onAddEquipment: (newEq: Omit<Equipment, 'id'> & { id?: string }) => void;
  onUpdateEquipment: (eq: Equipment) => void;
}

export const StaffEquipmentManagementView: React.FC<StaffEquipmentManagementViewProps> = ({
  equipmentList,
  onAddEquipment,
  onUpdateEquipment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Equipment | null>(null);

  // New Equipment Form State
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Projector');
  const [newStatus, setNewStatus] = useState<EquipmentStatus>('Available');
  const [newLocation, setNewLocation] = useState('ICT Room');

  const filtered = equipmentList.filter((eq) => {
    if (categoryFilter !== 'All' && eq.category !== categoryFilter) return false;
    if (statusFilter !== 'All' && eq.status !== statusFilter) return false;
    if (
      searchQuery &&
      !eq.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !eq.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = newId.trim() || `EQ-${String(equipmentList.length + 1).padStart(3, '0')}`;
    onAddEquipment({
      id: generatedId,
      name: newName,
      category: newCategory,
      status: newStatus,
      location: newLocation,
    });
    setShowAddModal(false);
    setNewName('');
    setNewId('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      onUpdateEquipment(editingItem);
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and filters bar (Page 11) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Equipment search and filters
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Search equipment:</span>
              <input
                type="text"
                placeholder="e.g. Projector, EQ-001..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 w-48"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="Projector">Projector</option>
                <option value="TV">TV</option>
                <option value="View Board">View Board</option>
                <option value="Speaker">Speaker</option>
                <option value="Laptop">Laptop</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="In Use">In Use</option>
                <option value="Unavailable">Unavailable</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Equipment</span>
          </button>
        </div>
      </div>

      {/* Equipment inventory table (Page 11) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Equipment inventory
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Equipment</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-mono font-semibold text-blue-600">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{item.location}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-base text-slate-800">
                + Add New Equipment
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Equipment ID (e.g. EQ-009)
                </label>
                <input
                  type="text"
                  placeholder="Auto-generated if empty"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Equipment Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4K Cinema Projector"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Projector">Projector</option>
                    <option value="TV">TV</option>
                    <option value="View Board">View Board</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Initial Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as EquipmentStatus)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Save Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Equipment Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-base text-slate-800">
                Edit Equipment: {editingItem.id}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Equipment Name
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={editingItem.status}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      status: e.target.value as EquipmentStatus,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="In Use">In Use</option>
                  <option value="Unavailable">Unavailable</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editingItem.location}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Update Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
