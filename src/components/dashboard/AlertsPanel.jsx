import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const alertIcons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle
};

const alertColors = {
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  success: 'bg-green-50 text-green-800 border-green-200'
};

export default function AlertsPanel({ alerts }) {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-xl">
      <CardHeader className="border-b border-slate-100">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          Action Required
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const Icon = alertIcons[alert.type];
            return (
              <div key={index} className={`p-4 rounded-lg border ${alertColors[alert.type]}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{alert.title}</h3>
                      <p className="text-sm opacity-90">{alert.message}</p>
                    </div>
                  </div>
                  {alert.action && alert.link && (
                    <Link to={alert.link}>
                      <Button variant="outline" size="sm">
                        {alert.action}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}