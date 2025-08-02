import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const colorClasses = {
  blue: {
    bg: 'bg-blue-500',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-100'
  },
  green: {
    bg: 'bg-green-500', 
    light: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-100'
  },
  purple: {
    bg: 'bg-purple-500',
    light: 'bg-purple-50', 
    text: 'text-purple-600',
    border: 'border-purple-100'
  },
  orange: {
    bg: 'bg-orange-500',
    light: 'bg-orange-50',
    text: 'text-orange-600', 
    border: 'border-orange-100'
  }
};

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendPositive, 
  color = 'blue',
  isLoading 
}) {
  const colors = colorClasses[color];

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="w-12 h-12 rounded-xl" />
          </div>
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 ${colors.light} rounded-full opacity-30`} />
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-900">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colors.light} border ${colors.border}`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        </div>
        
        {trend && (
          <div className="flex items-center text-sm">
            {trendPositive ? (
              <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
            )}
            <span className={trendPositive ? "text-green-600" : "text-red-600"}>
              {trend}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}