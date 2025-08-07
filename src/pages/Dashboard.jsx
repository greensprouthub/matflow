import React, { useState, useEffect } from "react";
import { Member, Class, Attendance, Payment } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";

import StatsCard from "../components/dashboard/StatsCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import AlertsPanel from "../components/dashboard/AlertsPanel";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    monthlyRevenue: 0,
    todayClasses: 0,
    attendanceRate: 0,
    pastDueMembers: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const startMonth = format(startOfMonth(new Date()), 'yyyy-MM-dd');
      const endMonth = format(endOfMonth(new Date()), 'yyyy-MM-dd');
      const last30Days = format(subDays(new Date(), 30), 'yyyy-MM-dd');

      const [members, todayClasses, payments, recentAttendance] = await Promise.all([
        Member.list(),
        Class.filter({ date: today }),
        Payment.list(),
        Attendance.list(),
      ]);

      const activeMembers = members.filter(m => m.membership_status === 'active');
      const pastDueMembers = members.filter(m => m.membership_status === 'past_due');

      const monthlyPayments = payments.filter(p => 
        p.payment_date >= startMonth && 
        p.payment_date <= endMonth &&
        p.status === 'completed'
      );
      const monthlyRevenue = monthlyPayments.reduce((sum, p) => sum + p.amount, 0);

      const recentAttendanceCount = recentAttendance.filter(a => a.check_in_time >= last30Days).length;
      const totalPossibleAttendance = activeMembers.length * 12; // Assume 3 classes per week
      const attendanceRate = totalPossibleAttendance > 0 ? (recentAttendanceCount / totalPossibleAttendance) * 100 : 0;

      setStats({
        totalMembers: members.length,
        activeMembers: activeMembers.length,
        monthlyRevenue,
        todayClasses: todayClasses.length,
        attendanceRate: Math.round(attendanceRate),
        pastDueMembers: pastDueMembers.length
      });

      const newAlerts = [];
      if (pastDueMembers.length > 0) {
        newAlerts.push({
          type: 'warning',
          title: 'Past Due Payments',
          message: `${pastDueMembers.length} members have past due payments`,
          action: 'View Members',
          link: createPageUrl('Members')
        });
      }

      const lowAttendanceMembers = members.filter(m => {
        const daysSinceLastAttendance = m.last_attendance_date 
          ? Math.floor((new Date() - new Date(m.last_attendance_date)) / (1000 * 60 * 60 * 24))
          : 999;
        return daysSinceLastAttendance > 7 && m.membership_status === 'active';
      });

      if (lowAttendanceMembers.length > 0) {
        newAlerts.push({
          type: 'info',
          title: 'Inactive Members',
          message: `${lowAttendanceMembers.length} active members haven't attended in 7+ days`,
          action: 'View Members',
          link: createPageUrl('Members')
        });
      }

      setAlerts(newAlerts);

      setRecentActivity([
        { type: 'check_in', message: 'John Silva checked in to Fundamentals', time: '2 minutes ago' },
        { type: 'payment', message: 'Sarah Johnson paid monthly dues ($150)', time: '1 hour ago' },
        { type: 'new_member', message: 'Mike Rodriguez joined as new member', time: '3 hours ago' },
        { type: 'belt_promotion', message: 'Ana Santos earned new stripe (White Belt)', time: '1 day ago' },
      ]);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Academy Dashboard
            </h1>
            <p className="text-slate-600 text-lg">
              {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </p>
          </div>
          <QuickActions />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Members"
            value={stats.totalMembers}
            subtitle={`${stats.activeMembers} active`}
            icon={Users}
            trend="+12% this month"
            trendPositive={true}
            color="blue"
            isLoading={isLoading}
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${stats.monthlyRevenue.toLocaleString()}`}
            subtitle="This month"
            icon={DollarSign}
            trend="+8% vs last month"
            trendPositive={true}
            color="green"
            isLoading={isLoading}
          />
          <StatsCard
            title="Today's Classes"
            value={stats.todayClasses}
            subtitle="Scheduled"
            icon={Calendar}
            trend="5 completed"
            color="purple"
            isLoading={isLoading}
          />
          <StatsCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            subtitle="Last 30 days"
            icon={Target}
            trend="+5% vs last month"
            trendPositive={true}
            color="orange"
            isLoading={isLoading}
          />
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <AlertsPanel alerts={alerts} />
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity activities={recentActivity} isLoading={isLoading} />
          </div>

          {/* Today's Schedule */}
          <div>
            <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-slate-200 rounded mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : stats.todayClasses > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-900">Fundamentals</h3>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          6:00 PM
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">Instructor: Prof. Silva</p>
                      <p className="text-xs text-slate-500 mt-1">12/20 students enrolled</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-900">Advanced Gi</h3>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          7:30 PM
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">Instructor: Prof. Santos</p>
                      <p className="text-xs text-slate-500 mt-1">8/15 students enrolled</p>
                    </div>
                    
                    <Link to={createPageUrl('Classes')}>
                      <Button variant="outline" className="w-full mt-4">
                        View Full Schedule
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No classes scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}