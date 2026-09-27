import { MapPin, Clock, ThumbsUp, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import type { CivicIssue } from '../../types';

export interface IssueCardProps {
  issue: CivicIssue;
  onUpvote?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function IssueCard({ issue, onUpvote, onViewDetails }: IssueCardProps) {
  return (
    <Card hoverEffect className="flex flex-col justify-between h-full bg-white border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <span className="font-mono text-xs font-bold text-chakra-900 bg-chakra-50 px-2.5 py-0.5 rounded border border-chakra-200">
            {issue.id}
          </span>
          <div className="flex items-center gap-1.5">
            <Badge status={issue.status} withDot />
            <Badge priority={issue.priority} />
          </div>
        </div>
        <CardTitle className="text-base font-bold text-slate-900 leading-snug">
          {issue.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs pt-1">
          {issue.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <MapPin className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
            <span className="truncate">
              {issue.location.address}, {issue.location.city} ({issue.location.pincode})
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {issue.reportedAt}
            </span>
            <span>•</span>
            <span>Ward: {issue.location.ward || 'General'}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-slate-100 pt-3">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ThumbsUp className="w-3.5 h-3.5 text-chakra-700" />}
          onClick={() => onUpvote?.(issue.id)}
          className="text-xs"
        >
          Upvote ({issue.upvotes})
        </Button>
        <button
          type="button"
          onClick={() => onViewDetails?.(issue.id)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-chakra-800 hover:text-chakra-900 hover:underline cursor-pointer"
        >
          Track Issue
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </CardFooter>
    </Card>
  );
}
