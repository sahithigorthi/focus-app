'use client';
import { useEffect, useState, useContext } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { UsernameContext } from './context';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

interface Task {
    id: number;
    task: string;
    completed: boolean;
    difficulty?: string;
    subject?: string;
}



export default function TodoList() {
    const [taskInput, setTaskInput] = useState('');
    const [tasks, updateTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');
    const { username } = useContext(UsernameContext);

    const STORAGE_KEY = 'guest_tasks';

    useEffect(() => {
        if (username) {
            const fetchTasks = async () => {
                const { data, error } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq('user_email', username);
                if (!error && data) updateTasks(data);
            };
            fetchTasks();
        } else {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) updateTasks(JSON.parse(saved));
            else updateTasks([]);
        }
    }, [username]);

    function saveLocalTasks(newTasks: Task[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
        updateTasks(newTasks);
    }

    async function addTask(task: string) {
        if (task.trim() === '') return;

        if (username) {
            const { data, error } = await supabase
                .from('tasks')
                .insert([{ task, user_email: username }])
                .select()
                .single();

            if (!error && data) {
                updateTasks([...tasks, data]);
                setTaskInput('');
            }
        } else {
            const newTask: Task = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                task,
                completed: false,
                difficulty: 'Medium',
                subject: 'General',
            };
            const newTasks = [...tasks, newTask];
            saveLocalTasks(newTasks);
            setTaskInput('');
        }
    }

    async function onClear() {
        if (username) {
            const { error } = await supabase.from('tasks').delete().eq('user_email', username);
            if (!error) updateTasks([]);
        } else {
            saveLocalTasks([]);
        }
    }

    async function onDelete(taskId: number) {
        if (username) {
            const { error } = await supabase.from('tasks').delete().eq('id', taskId);
            if (!error) updateTasks(tasks.filter((task) => task.id !== taskId));
        } else {
            const filtered = tasks.filter((task) => task.id !== taskId);
            saveLocalTasks(filtered);
        }
    }

    async function toggleComplete(task: Task) {
        if (username) {
            const { data, error } = await supabase
                .from('tasks')
                .update({ completed: !task.completed })
                .eq('id', task.id)
                .select()
                .single();

            if (!error && data) {
                updateTasks(tasks.map((t) => (t.id === task.id ? { ...t, completed: data.completed } : t)));
            }
        } else {
            const updated = tasks.map((t) =>
                t.id === task.id ? { ...t, completed: !t.completed } : t
            );
            saveLocalTasks(updated);
        }
    }
    async function saveEdit(taskId: number) {
        if (!editingText.trim()) return;
        if (username) {
            const { data, error } = await supabase
                .from('tasks')
                .update({ task: editingText })
                .eq('id', taskId)
                .select()
                .single();

            if (!error && data) {
                updateTasks(tasks.map((t) => (t.id === taskId ? { ...t, task: data.task } : t)));
                setEditingTask(null);
                setEditingText('');
            }
        } else {
            const updated = tasks.map((t) =>
                t.id === taskId ? { ...t, task: editingText } : t
            );
            saveLocalTasks(updated);
            setEditingTask(null);
            setEditingText('');
        }
    }
    async function updateTaskField(taskId: number, field: keyof Task, value: string) {
        if (username) {
            const { data, error } = await supabase
                .from('tasks')
                .update({ [field]: value })
                .eq('id', taskId)
                .select()
                .single();

            if (!error && data) {
                updateTasks(tasks.map((t) => (t.id === taskId ? { ...t, [field]: value } : t)));
            }
        } else {
            const updated = tasks.map((t) =>
                t.id === taskId ? { ...t, [field]: value } : t
            );
            saveLocalTasks(updated);
        }
    }
    return (
        <>
            <div className="grid grid-cols-2 m-4">
                <div className="font-bold rounded-sm text-gray-950 bg-gray-100">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addTask(taskInput);
                        }}
                    >
                        <input
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                            placeholder="Enter a Task!"
                            className="outline-none w-56 rounded-sm px-1"
                        />
                    </form>
                </div>
                <div>
                    <button
                        className="bg-blue-200 text-blue-700 w-12 rounded-sm mx-3"
                        onClick={() => addTask(taskInput)}
                    >
                        <b>Add</b>
                    </button>
                    <button className="text-red-700 w-20 rounded-sm bg-red-200" onClick={onClear}>
                        <b>Clear List</b>
                    </button>
                </div>
            </div>
            <div className="mx-5 text-white font-semibold space-y-3">
                {tasks.map((task) => (
                    <div className="flex flex-col bg-gray-500 rounded p-2" key={task.id}>
                        <div className="flex items-center space-x-2">
                            {editingTask === task.id ? (
                                <input
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="bg-gray-700 text-white rounded-sm px-1"
                                />
                            ) : (
                                <>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task)}
                                    />
                                    <span className={task.completed ? 'line-through' : ''}>{task.task}</span>
                                </>
                            )}
                            <button
                                className="text-blue-700 bg-blue-200 px-1 rounded-sm ml-auto text-sm"
                                onClick={() => {
                                    if (editingTask === task.id) {
                                        saveEdit(task.id);
                                    } else {
                                        setEditingTask(task.id);
                                        setEditingText(task.task);
                                    }
                                }}
                            >
                                {editingTask === task.id ? 'Save' : 'Edit'}
                            </button>
                            <button
                                className="text-red-700 hover:text-red-900 ml-1 bg-red-200 px-1 rounded-sm text-sm"
                                onClick={() => onDelete(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                        <div className="flex space-x-4 mt-2 text-sm text-black">
                            <div>
                                <label className="mr-1 text-white">Difficulty:</label>
                                <select
                                    value={task.difficulty || 'Medium'}
                                    onChange={(e) => updateTaskField(task.id, 'difficulty', e.target.value)}
                                    className="rounded-sm px-1 text-sm bg-gray-300 "
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>

                            <div>
                                <label className="mr-1 text-white">Subject:</label>
                                <select
                                    value={task.subject || 'General'}
                                    onChange={(e) => updateTaskField(task.id, 'subject', e.target.value)}
                                    className="rounded-sm px-1 text-sm bg-gray-300"
                                >
                                    <option value="General">General</option>
                                    <option value="Math">Math</option>
                                    <option value="Science">Science</option>
                                    <option value="Literature">English</option>
                                    <option value="History">History</option>
                                    <option value="Language">Language</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}