import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function MemberFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="min-w-[150px]">
        <Label className="text-sm text-slate-600">Status</Label>
        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger className="bg-white/60 backdrop-blur-sm border-slate-200/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="past_due">Past Due</SelectItem>
            <SelectItem value="frozen">Frozen</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <Label className="text-sm text-slate-600">Membership</Label>
        <Select value={filters.membershipType} onValueChange={(value) => handleFilterChange('membershipType', value)}>
          <SelectTrigger className="bg-white/60 backdrop-blur-sm border-slate-200/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="unlimited">Unlimited</SelectItem>
            <SelectItem value="8_classes">8 Classes</SelectItem>
            <SelectItem value="4_classes">4 Classes</SelectItem>
            <SelectItem value="drop_in">Drop-in</SelectItem>
            <SelectItem value="family">Family</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-[150px]">
        <Label className="text-sm text-slate-600">Belt</Label>
        <Select value={filters.belt} onValueChange={(value) => handleFilterChange('belt', value)}>
          <SelectTrigger className="bg-white/60 backdrop-blur-sm border-slate-200/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Belts</SelectItem>
            <SelectItem value="white">White Belt</SelectItem>
            <SelectItem value="blue">Blue Belt</SelectItem>
            <SelectItem value="purple">Purple Belt</SelectItem>
            <SelectItem value="brown">Brown Belt</SelectItem>
            <SelectItem value="black">Black Belt</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}