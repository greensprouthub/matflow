import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LogIn, 
  CreditCard, 
  UserPlus, 
  Award,
  Activity
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const activityIcons = {
  check_in: LogIn,
  payment: CreditCard,
  new_member: UserPlus,
  belt_promotion: Award
};

const activityColors = {
  check_in: 'bg-blue-50 text-blue-600 border-blue-100',
  payment: 'bg-green-50 text-green-600 border-green-100', 
  new_member: 'bg-purple-50 text-purple-600 border-purple-100',
  belt_promotion: 'bg-orange-50 text-orange-600 border-orange-100'
};

export default function RecentActivity({ activities, isLoading }) {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl">
      <CardHeader className="border-b border-slate-100">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Activity className="w-5 h-5 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start gap-4 animate-pulse">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activityIcons[activity.type];
              return (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50/50 border border-slate-100">
                  <div className={`p-2 rounded-lg border ${activityColors[activity.type]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      {activity.message}
                    </p>
                    <p className="text-xs text-slate-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}