import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useTodo, useDeleteTodo } from '../hooks/useTodos';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Calendar, Tag, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/lib/constants';

function DetailSkeleton() {
  return (
    <div className="border border-slate-200 rounded-xl bg-white shadow-sm animate-pulse">
      <div className="p-6 border-b border-slate-100">
        <div className="h-8 w-2/3 bg-slate-200 rounded mb-4" />
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-slate-200 rounded" />
          <div className="h-5 w-20 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-4/5 bg-slate-200 rounded" />
        <div className="h-4 w-3/5 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

export default function TodoDetails() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const { data: todo, isLoading, isError } = useTodo(id);
  const deleteMutation = useDeleteTodo();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => navigate('/'),
      });
    }
  };

  if (!id) {
    return (
      <div className="container mx-auto p-6 max-w-3xl text-center text-slate-500 mt-12">
        No task ID provided. <Link to="/" className="text-blue-600 underline">Return to dashboard.</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center max-w-3xl">
          <Link to="/">
            <Button variant="ghost" className="pl-0 hover:bg-slate-100 text-slate-700 font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl mt-10">
        {isLoading ? (
          <DetailSkeleton />
        ) : isError || !todo ? (
          <div className="text-center py-16 border border-slate-200 border-dashed rounded-xl bg-white">
            <p className="text-slate-500 text-base">Task not found.</p>
            <Link to="/">
              <Button variant="outline" className="mt-4">Return to dashboard</Button>
            </Link>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-xl bg-white shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-start mb-5">
                <h1 className="text-2xl font-bold text-slate-900 leading-snug pr-4">{todo.title}</h1>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label={`Delete "${todo.title}"`}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 shrink-0"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <Badge
                  className={`${STATUS_COLORS[todo.status]} font-medium border rounded-md px-2 py-0.5 text-xs capitalize shadow-none`}
                  variant="outline"
                >
                  {todo.status.replace('-', ' ')}
                </Badge>
                <Badge
                  className={`${PRIORITY_COLORS[todo.priority]} font-medium border rounded-md px-2 py-0.5 text-xs capitalize shadow-none`}
                  variant="outline"
                >
                  {todo.priority} priority
                </Badge>
                {todo.category && (
                  <Badge variant="outline" className="border-slate-200 text-slate-600 text-xs rounded-md px-2 py-0.5 shadow-none">
                    {todo.category}
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">Description</h2>
                <p className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">
                  {todo.description || 'No description provided.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="mr-2 h-4 w-4 text-slate-400" aria-hidden="true" />
                    <span className="font-medium mr-2">Due date:</span>
                    {todo.dueDate ? format(new Date(todo.dueDate), 'MMM d, yyyy') : 'None'}
                  </div>
                  <div className="flex items-start text-sm text-slate-600">
                    <Tag className="mr-2 h-4 w-4 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="font-medium mr-2">Tags:</span>
                    <div className="flex gap-1 flex-wrap">
                      {todo.tags && todo.tags.length > 0 ? (
                        todo.tags.map((tag) => (
                          <span key={tag} className="bg-white border border-slate-200 px-2 py-0.5 rounded-md text-xs text-slate-600">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Created: </span>
                    {format(new Date(todo.createdAt), 'MMM d, yyyy HH:mm')}
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Last updated: </span>
                    {format(new Date(todo.updatedAt), 'MMM d, yyyy HH:mm')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
