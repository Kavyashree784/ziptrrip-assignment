import React, { useState, useMemo } from 'react';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../hooks/useTodos';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, Search, Layers, CheckCircle2, Clock, ListTodo, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function StatsCard({ label, value, icon: Icon, iconClass }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${iconClass}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className="text-4xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const { data: todos, isLoading, isError } = useTodos();
  const createMutation = useCreateTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const stats = useMemo(() => {
    if (!todos) return { total: 0, done: 0, inProgress: 0, todo: 0 };
    return todos.reduce(
      (acc, curr) => {
        acc.total++;
        if (curr.status === 'done') acc.done++;
        else if (curr.status === 'in-progress') acc.inProgress++;
        else acc.todo++;
        return acc;
      },
      { total: 0, done: 0, inProgress: 0, todo: 0 }
    );
  }, [todos]);

  const filteredAndSortedTodos = useMemo(() => {
    if (!todos) return [];

    const result = todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(search.toLowerCase()) ||
        todo.description?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === 'all' || todo.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    return result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });
  }, [todos, search, filterStatus, sortBy]);

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingTodo(null);
  };

  const handleFormSubmit = (data) => {
    if (editingTodo) {
      updateMutation.mutate({ id: editingTodo.id, data }, { onSuccess: closeDialog });
    } else {
      createMutation.mutate(data, { onSuccess: closeDialog });
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id);
    }
  };

  const isFormSubmitting = createMutation.isPending || updateMutation.isPending;

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-700 font-medium text-lg mb-2">Unable to connect to server</p>
          <p className="text-slate-500 text-sm">Please ensure the backend is running on port 5000.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white shadow-sm">
              <ListTodo className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-slate-900">Workspace</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl mt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Issues</h1>
            <p className="text-base text-slate-500 mt-4">Manage and track your tasks across the project.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); else setIsDialogOpen(true); }}>
            <DialogTrigger asChild>
              <Button className="shadow-sm bg-blue-600 hover:bg-blue-700 text-white h-10 px-6 rounded-md">
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                New task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {editingTodo ? 'Edit task' : 'Create task'}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-6">
                <TodoForm
                  initialData={editingTodo}
                  onSubmit={handleFormSubmit}
                  onCancel={closeDialog}
                  isSubmitting={isFormSubmitting}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatsCard label="Total issues" value={stats.total} icon={Layers} iconClass="bg-slate-100 text-slate-600" />
          <StatsCard label="To do" value={stats.todo} icon={Clock} iconClass="bg-slate-100 text-slate-600" />
          <StatsCard label="In progress" value={stats.inProgress} icon={Activity} iconClass="bg-blue-100 text-blue-600" />
          <StatsCard label="Done" value={stats.done} icon={CheckCircle2} iconClass="bg-slate-100 text-slate-500" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
            <label htmlFor="search-input" className="sr-only">Search tasks</label>
            <Input
              id="search-input"
              placeholder="Search tasks..."
              className="pl-10 h-10 border-slate-200 bg-white shadow-sm focus-visible:ring-1 focus-visible:ring-blue-600 w-full rounded-md text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <label htmlFor="filter-status" className="sr-only">Filter by status</label>
            <Select
              id="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 w-full sm:w-[160px] border-slate-200 bg-white shadow-sm text-slate-700 font-medium rounded-md"
            >
              <option value="all">All status</option>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </Select>
            <label htmlFor="sort-by" className="sr-only">Sort by</label>
            <Select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 w-full sm:w-[160px] border-slate-200 bg-white shadow-sm text-slate-700 font-medium rounded-md"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="dueDate">Due date</option>
            </Select>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Tasks</h2>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-56 rounded-xl bg-slate-200/50 animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : filteredAndSortedTodos.length > 0 ? (
            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredAndSortedTodos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 border border-slate-200 border-dashed rounded-xl bg-white shadow-sm flex flex-col items-center justify-center"
            >
              <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                <Search className="h-6 w-6 text-slate-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">No tasks found</h3>
              <p className="text-slate-500 mt-2 max-w-md text-base">
                No tasks match your current filters. Try adjusting them or create a new task.
              </p>
              <Button
                className="mt-8 h-10 px-6 rounded-md shadow-sm border border-slate-200 bg-white hover:bg-slate-50 text-slate-900"
                onClick={() => setIsDialogOpen(true)}
                variant="outline"
              >
                Create task
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
