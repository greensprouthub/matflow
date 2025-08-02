import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Save } from "lucide-react";

export default function MemberForm({ member, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    first_name: member?.first_name || '',
    last_name: member?.last_name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    emergency_contact: member?.emergency_contact || { name: '', phone: '', relationship: '' },
    membership_type: member?.membership_type || 'unlimited',
    membership_status: member?.membership_status || 'active',
    current_belt: member?.current_belt || 'white',
    current_stripes: member?.current_stripes || 0,
    start_date: member?.start_date || new Date().toISOString().split('T')[0],
    monthly_fee: member?.monthly_fee || 150,
    notes: member?.notes || ''
  });

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
      <CardHeader className="border-b border-slate-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-slate-900">
            {member ? 'Edit Member' : 'Add New Member'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
                required
                className="bg-white/60"
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
                required
                className="bg-white/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="bg-white/60"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="bg-white/60"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergency_name">Name</Label>
                <Input
                  id="emergency_name"
                  value={formData.emergency_contact.name}
                  onChange={(e) => handleChange('emergency_contact.name', e.target.value)}
                  className="bg-white/60"
                />
              </div>
              <div>
                <Label htmlFor="emergency_phone">Phone</Label>
                <Input
                  id="emergency_phone"
                  value={formData.emergency_contact.phone}
                  onChange={(e) => handleChange('emergency_contact.phone', e.target.value)}
                  className="bg-white/60"
                />
              </div>
              <div>
                <Label htmlFor="emergency_relationship">Relationship</Label>
                <Input
                  id="emergency_relationship"
                  value={formData.emergency_contact.relationship}
                  onChange={(e) => handleChange('emergency_contact.relationship', e.target.value)}
                  className="bg-white/60"
                />
              </div>
            </div>
          </div>

          {/* Membership Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Membership Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="membership_type">Membership Type *</Label>
                <Select value={formData.membership_type} onValueChange={(value) => handleChange('membership_type', value)}>
                  <SelectTrigger className="bg-white/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                    <SelectItem value="8_classes">8 Classes/Month</SelectItem>
                    <SelectItem value="4_classes">4 Classes/Month</SelectItem>
                    <SelectItem value="drop_in">Drop-in</SelectItem>
                    <SelectItem value="family">Family Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="membership_status">Status</Label>
                <Select value={formData.membership_status} onValueChange={(value) => handleChange('membership_status', value)}>
                  <SelectTrigger className="bg-white/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="frozen">Frozen</SelectItem>
                    <SelectItem value="past_due">Past Due</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="monthly_fee">Monthly Fee ($) *</Label>
                <Input
                  id="monthly_fee"
                  type="number"
                  value={formData.monthly_fee}
                  onChange={(e) => handleChange('monthly_fee', parseFloat(e.target.value))}
                  required
                  className="bg-white/60"
                />
              </div>
            </div>
          </div>

          {/* Belt Progress */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Belt Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="current_belt">Current Belt</Label>
                <Select value={formData.current_belt} onValueChange={(value) => handleChange('current_belt', value)}>
                  <SelectTrigger className="bg-white/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White Belt</SelectItem>
                    <SelectItem value="blue">Blue Belt</SelectItem>
                    <SelectItem value="purple">Purple Belt</SelectItem>
                    <SelectItem value="brown">Brown Belt</SelectItem>
                    <SelectItem value="black">Black Belt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="current_stripes">Stripes</Label>
                <Select value={formData.current_stripes.toString()} onValueChange={(value) => handleChange('current_stripes', parseInt(value))}>
                  <SelectTrigger className="bg-white/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 Stripes</SelectItem>
                    <SelectItem value="1">1 Stripe</SelectItem>
                    <SelectItem value="2">2 Stripes</SelectItem>
                    <SelectItem value="3">3 Stripes</SelectItem>
                    <SelectItem value="4">4 Stripes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleChange('start_date', e.target.value)}
                  className="bg-white/60"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional notes about this member..."
              className="bg-white/60"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {member ? 'Update Member' : 'Add Member'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}