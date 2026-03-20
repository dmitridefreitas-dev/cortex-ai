
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search, 
  User, 
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const PortalPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'schedule', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'Patient Registry', icon: Users },
    { id: 'inbox', label: 'AI Inbox', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <Helmet>
        <title>Clinical Hub | Cortex AI</title>
      </Helmet>

      <div className="flex h-screen bg-background overflow-hidden">
        {/* Portal Sidebar */}
        <aside className="w-64 bg-surface-elevated border-r border-border flex flex-col z-20">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold">C</div>
              <span className="font-bold text-text-primary">Clinical Hub</span>
            </div>
          </div>
          
          <nav className="flex-grow p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                    : 'text-text-secondary hover:bg-muted'
                }`}
              >
                <item.icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-border">
            <button 
              onClick={() => navigate('/login')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-status-error hover:bg-status-error/5 transition-all"
            >
              <LogOut size={18} />
              <span className="font-medium text-sm">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-surface-elevated/50 backdrop-blur-md border-b border-border px-8 flex items-center justify-between z-10">
            <div className="relative w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search patients, appointments..." 
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:ring-2 focus:ring-brand-primary outline-none text-sm transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="h-10 w-10 rounded-full flex items-center justify-center text-text-secondary hover:bg-muted relative transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 h-2 w-2 bg-status-error rounded-full border-2 border-surface-elevated"></span>
              </button>
              <div className="h-8 w-px bg-border mx-2"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-text-primary leading-none">Dr. Sarah Mitchell</p>
                  <p className="text-[10px] text-text-secondary">Chief Medical Officer</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-muted border border-border flex items-center justify-center text-text-secondary">
                  <User size={20} />
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto p-8 bg-background/50">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto space-y-8"
            >
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary tracking-tight">Overview</h1>
                  <p className="text-text-secondary font-medium">Welcome back, Dr. Mitchell. Here's your practice at a glance.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Export Report</Button>
                  <Button size="sm" className="bg-brand-primary text-white">New Appointment</Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Calls', value: '1,284', change: '+12%', icon: TrendingUp, color: 'text-brand-primary' },
                  { label: 'Appointments', value: '42', change: '8 pending', icon: Calendar, color: 'text-status-info' },
                  { label: 'Completion', value: '98.2%', change: '+1.4%', icon: CheckCircle2, color: 'text-status-success' },
                  { label: 'Avg Wait', value: '0.4s', change: '-0.2s', icon: Clock, color: 'text-status-warning' },
                ].map((stat, i) => (
                  <Card key={i} className="border-none shadow-sm bg-surface-elevated">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                          <stat.icon size={20} />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-muted text-text-secondary">
                          {stat.change}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-text-primary mt-1">{stat.value}</h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 border-none shadow-sm bg-surface-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent AI Interactions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { patient: 'Robert Fox', action: 'Booked Appointment', time: '2m ago', status: 'success' },
                      { patient: 'Jane Cooper', action: 'Inquired about Insurance', time: '15m ago', status: 'info' },
                      { patient: 'Cody Fisher', action: 'Cancelled (Sent Outreach)', time: '1h ago', status: 'error' },
                      { patient: 'Esther Howard', action: 'Rescheduled V2', time: '3h ago', status: 'success' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-brand-primary/20 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                            {activity.patient[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-primary">{activity.patient}</p>
                            <p className="text-xs text-text-secondary">{activity.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-text-secondary uppercase">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* AI Status */}
                <Card className="border-none shadow-sm bg-brand-primary text-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle size={20} />
                      Cortex Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                      <p className="text-xs font-medium text-white/80 uppercase mb-2">Current Load</p>
                      <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-2">
                        <div className="h-full w-[12%] bg-white rounded-full"></div>
                      </div>
                      <p className="text-sm font-bold">Healthy (12% utilization)</p>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm font-medium">Auto-answering active across 14 channels. No interruptions detected in the last 24 hours.</p>
                      <Button className="w-full bg-white text-brand-primary hover:bg-white/90">
                        View AI Logs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PortalPage;
