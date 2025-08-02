import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard,
  Edit,
  Trophy,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  active: 'bg-green-100 text-green-800 border-green-200',
  past_due: 'bg-red-100 text-red-800 border-red-200',
  frozen: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200'
};

const beltColors = {
  white: 'bg-gray-100 text-gray-800 border-gray-300',
  blue: 'bg-blue-100 text-blue-800 border-blue-300',
  purple: 'bg-purple-100 text-purple-800 border-purple-300',
  brown: 'bg-amber-100 text-amber-800 border-amber-300',
  black: 'bg-slate-100 text-slate-800 border-slate-300'
};

export default function MemberCard({ member, onEdit }) {
  const getBeltDisplay = () => {
    const stripes = member.current_stripes > 0 ? ` (${member.current_stripes} stripe${member.current_stripes > 1 ? 's' : ''})` : '';
    return `${member.current_belt?.charAt(0).toUpperCase() + member.current_belt?.slice(1)} Belt${stripes}`;
  };

  const daysSinceLastAttendance = member.last_attendance_date 
    ? Math.floor((new Date() - new Date(member.last_attendance_date)) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-300 group">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {member.first_name} {member.last_name}
            </h3>
            <Badge className={`${statusColors[member.membership_status]} border text-xs`}>
              {member.membership_status?.replace('_', ' ')}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(member)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Mail className="w-4 h-4" />
            <span className="truncate">{member.email}</span>
          </div>
          {member.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="w-4 h-4" />
              <span>{member.phone}</span>
            </div>
          )}
        </div>

        {/* Belt Progress */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-slate-700">Belt Progress</span>
          </div>
          <Badge className={`${beltColors[member.current_belt]} border`}>
            {getBeltDisplay()}
          </Badge>
        </div>

        {/* Membership Info */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Membership:</span>
            <span className="font-medium text-slate-700">
              {member.membership_type?.replace('_', ' ')}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Monthly Fee:</span>
            <span className="font-medium text-slate-700">${member.monthly_fee}</span>
          </div>
          {member.start_date && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Started:</span>
              <span className="font-medium text-slate-700">
                {format(new Date(member.start_date), 'MMM yyyy')}
              </span>
            </div>
          )}
        </div>

        {/* Attendance Warning */}
        {daysSinceLastAttendance && daysSinceLastAttendance > 7 && member.membership_status === 'active' && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-yellow-700">
              No attendance for {daysSinceLastAttendance} days
            </span>
          </div>
        )}

        {/* Payment Status */}
        {member.membership_status === 'past_due' && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <CreditCard className="w-4 h-4 text-red-600" />
            <span className="text-xs text-red-700">
              Payment overdue - {member.failed_payment_count} failed attempts
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-slate-900">{member.total_classes_attended || 0}</p>
            <p className="text-xs text-slate-500">Classes</p>
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {member.start_date 
                ? Math.floor((new Date() - new Date(member.start_date)) / (1000 * 60 * 60 * 24 * 30))
                : 0
              }
            </p>
            <p className="text-xs text-slate-500">Months</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}