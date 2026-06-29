import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Trash2, Edit2, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { PRIORITY_COLORS, STATUS_COLORS } from '@/lib/constants';

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function TodoCard({ todo, onEdit, onDelete }) {
  return (
    <motion.div variants={item} layout className="h-full">
      <Card className="flex flex-col h-full justify-between hover:shadow-md transition-shadow group border-slate-200 bg-white">
        <CardHeader className="p-6 pb-4">
          <div className="flex justify-between items-start mb-4 gap-2">
            <Badge
              className={`${PRIORITY_COLORS[todo.priority]} font-medium border rounded-md px-2 py-0.5 text-xs shadow-none capitalize`}
              variant="outline"
            >
              {todo.priority}
            </Badge>
            <Badge
              className={`${STATUS_COLORS[todo.status]} font-medium border rounded-md px-2 py-0.5 text-xs capitalize tracking-wide shadow-none`}
              variant="outline"
            >
              {todo.status.replace('-', ' ')}
            </Badge>
          </div>
          <CardTitle className="line-clamp-1 text-lg font-semibold text-slate-900 leading-snug">
            {todo.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 min-h-[2.5rem] text-sm text-slate-500 mt-2 leading-relaxed">
            {todo.description || 'No description provided.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0 pb-6 flex-grow">
          <div className="flex flex-col gap-4 mt-2">
            {todo.dueDate && (
              <div className="flex items-center text-sm font-medium text-slate-500">
                <Calendar className="mr-2 h-4 w-4 text-slate-400" aria-hidden="true" />
                {format(new Date(todo.dueDate), 'MMM d, yyyy')}
              </div>
            )}
            {todo.tags && todo.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-slate-400 mr-1" aria-hidden="true" />
                {todo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t border-slate-100 p-6">
          <Link to={`/todo?id=${todo.id}`}>
            <Button variant="link" className="px-0 text-sm font-medium text-blue-600 hover:text-blue-700 h-10 w-auto">
              View details
            </Button>
          </Link>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Edit "${todo.title}"`}
              className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-md"
              onClick={() => onEdit(todo)}
            >
              <Edit2 className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Delete "${todo.title}"`}
              className="h-10 w-10 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-md"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
