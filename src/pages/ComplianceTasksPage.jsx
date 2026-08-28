import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  Calendar,
  Plus,
  User,
  ChevronRight,
  Check
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SearchInput from '../components/ui/SearchInput';
import EmptyState from '../components/ui/EmptyState';
import { initialTasksList } from '../data/tasksData';

export default function ComplianceTasksPage({ showToast, setModalState }) {
  const [tasks, setTasks] = useState(initialTasksList);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed || t.status === 'Completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress' && !t.completed).length;
  const upcomingCount = tasks.filter((t) => t.status === 'Upcoming' && !t.completed).length;

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          showToast(nextState ? 'Task marked as completed.' : 'Task moved to pending.');
          return {
            ...t,
            completed: nextState,
            status: nextState ? 'Completed' : 'Upcoming',
          };
        }
        return t;
      })
    );
  };

  const handleOpenTaskDetail = (task) => {
    setModalState({
      isOpen: true,
      title: task.title,
      type: 'task-detail',
      data: task,
    });
  };

  const handleOpenAddTask = () => {
    setModalState({
      isOpen: true,
      title: 'Create Compliance Task',
      type: 'add-task',
      data: {
        onAdd: (newTask) => {
          setTasks((prev) => [newTask, ...prev]);
          showToast('New compliance task created successfully.');
        },
      },
    });
  };

  const filteredTasks = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.relatedApproval.toLowerCase().includes(search.toLowerCase()) ||
      t.assignee.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' ||
      (statusFilter === 'Completed' && (t.completed || t.status === 'Completed')) ||
      (statusFilter === 'In Progress' && t.status === 'In Progress' && !t.completed) ||
      (statusFilter === 'Upcoming' && t.status === 'Upcoming' && !t.completed);
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Compliance Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track and manage your business compliance requirements.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAddTask}
          className="self-start sm:self-auto text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Total Tasks</div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Statutory workflow</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Completed</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{completedCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Filed on schedule</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">In Progress</div>
            <div className="text-xl sm:text-2xl font-black text-blue-600 mt-1">{inProgressCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Preparation active</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Upcoming</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{upcomingCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Deadlines scheduled</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Search tasks, approvals, assignees..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all text-slate-700"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Task List Management Interface */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks match your criteria"
          description="Adjust your search filters or click Add Task to create a new compliance task."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setStatusFilter('All');
            setPriorityFilter('All');
          }}
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group ${
                task.completed ? 'bg-slate-50/40 opacity-75' : ''
              }`}
            >
              {/* Left Side: Checkbox + Title + Meta */}
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                {/* Custom Checkbox */}
                <button
                  type="button"
                  onClick={() => handleToggleTask(task.id)}
                  className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    task.completed
                      ? 'bg-emerald-500 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white hover:border-blue-500 text-transparent'
                  }`}
                  aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'completed'}`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors ${
                        task.completed ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.title}
                    </h3>

                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        task.priority === 'High'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                    <span className="font-medium text-blue-600">
                      Approval: {task.relatedApproval}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {task.assignee}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Due Date + Status + Detail Button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-700">{task.dueDate}</div>
                  <div className="mt-0.5">
                    <Badge
                      variant={task.completed ? 'Completed' : task.status}
                      size="xs"
                      withDot
                    >
                      {task.completed ? 'Completed' : task.status}
                    </Badge>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenTaskDetail(task)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-500 border border-transparent hover:border-blue-200 transition-colors cursor-pointer"
                  title="View Task Details"
                  aria-label="View Task Details"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}