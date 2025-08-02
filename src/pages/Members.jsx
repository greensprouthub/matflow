import React, { useState, useEffect } from "react";
import { Member } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Filter,
  Users,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";

import MemberCard from "../components/members/MemberCard";
import MemberForm from "../components/members/MemberForm";
import MemberFilters from "../components/members/MemberFilters";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    membershipType: 'all',
    belt: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, filters]);

  const loadMembers = async () => {
    setIsLoading(true);
    try {
      const data = await Member.list('-created_date');
      setMembers(data);
    } catch (error) {
      console.error('Error loading members:', error);
    }
    setIsLoading(false);
  };

  const filterMembers = () => {
    let filtered = members;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(member => 
        `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(member => member.membership_status === filters.status);
    }

    // Membership type filter
    if (filters.membershipType !== 'all') {
      filtered = filtered.filter(member => member.membership_type === filters.membershipType);
    }

    // Belt filter
    if (filters.belt !== 'all') {
      filtered = filtered.filter(member => member.current_belt === filters.belt);
    }

    setFilteredMembers(filtered);
  };

  const handleSaveMember = async (memberData) => {
    try {
      if (selectedMember) {
        await Member.update(selectedMember.id, memberData);
      } else {
        await Member.create(memberData);
      }
      setShowAddForm(false);
      setSelectedMember(null);
      loadMembers();
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowAddForm(true);
  };

  const getStatusStats = () => {
    const active = members.filter(m => m.membership_status === 'active').length;
    const pastDue = members.filter(m => m.membership_status === 'past_due').length;
    const frozen = members.filter(m => m.membership_status === 'frozen').length;
    
    return { active, pastDue, frozen };
  };

  const stats = getStatusStats();

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Members
            </h1>
            <p className="text-slate-600">
              Manage your academy members and track their progress
            </p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 shadow-lg"
            onClick={() => {
              setSelectedMember(null);
              setShowAddForm(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Member
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Members</p>
                  <p className="text-2xl font-bold text-slate-900">{members.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Active Members</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Past Due</p>
                  <p className="text-2xl font-bold text-red-600">{stats.pastDue}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Frozen</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.frozen}</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Frozen</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/60 backdrop-blur-sm border-slate-200/60"
            />
          </div>
          <MemberFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Add/Edit Member Form */}
        {showAddForm && (
          <MemberForm
            member={selectedMember}
            onSave={handleSaveMember}
            onCancel={() => {
              setShowAddForm(false);
              setSelectedMember(null);
            }}
          />
        )}

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-200 rounded mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))
          ) : filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onEdit={() => handleEditMember(member)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No members found</h3>
              <p className="text-slate-500">
                {searchTerm || filters.status !== 'all' || filters.membershipType !== 'all' || filters.belt !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Add your first member to get started'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}