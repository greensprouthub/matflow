import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, Calendar, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link to={createPageUrl('Members')}>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </Link>
      <Link to={createPageUrl('Classes')}>
        <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Class
        </Button>
      </Link>
      <Link to={createPageUrl('Billing')}>
        <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
          <CreditCard className="w-4 h-4 mr-2" />
          Process Payment
        </Button>
      </Link>
    </div>
  );
}