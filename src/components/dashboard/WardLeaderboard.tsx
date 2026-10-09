import { Trophy, Medal, Award, CheckCircle2 } from 'lucide-react';
import type { WardLeader } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface WardLeaderboardProps {
  leaders: WardLeader[];
}

export function WardLeaderboard({ leaders }: WardLeaderboardProps) {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shadow-sm border border-amber-300">
            🥇
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-sm shadow-sm border border-slate-300">
            🥈
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-900 flex items-center justify-center font-bold text-sm shadow-sm border border-amber-600/30">
            🥉
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
            #{rank}
          </div>
        );
    }
  };

  return (
    <Card className="p-6 border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-saffron-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Ward 45-B Civic Champions
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          Monthly Leaderboard
        </span>
      </div>

      {/* Leaders List */}
      <div className="space-y-3">
        {leaders.map((leader) => (
          <div
            key={leader.name}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
              leader.isCurrentUser
                ? 'bg-saffron-50/60 border-saffron-300 shadow-sm ring-1 ring-saffron-200'
                : 'bg-white border-slate-200/80 hover:bg-slate-50/80'
            }`}
          >
            {/* Left: Rank & Avatar & Name */}
            <div className="flex items-center gap-3">
              {getRankBadge(leader.rank)}

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chakra-900 to-chakra-700 text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                {leader.avatar}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {leader.name}
                  </span>
                  {leader.isCurrentUser && (
                    <Badge variant="saffron" className="text-[10px] py-0 px-1.5 font-bold">
                      YOU
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Award className="w-3 h-3 text-saffron-600" />
                  <span>{leader.badge}</span>
                </p>
              </div>
            </div>

            {/* Right: Resolutions */}
            <div className="text-right">
              <div className="inline-flex items-center gap-1 font-extrabold text-xs sm:text-sm text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{leader.issuesResolved} Resolved</span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold flex items-center justify-end gap-1 mt-0.5">
                <span>Verified Citizen</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer info pill */}
      <div className="mt-5 p-3 rounded-xl bg-chakra-50 border border-chakra-200 text-xs text-chakra-900 flex items-center gap-2">
        <Medal className="w-4 h-4 text-chakra-700 shrink-0" />
        <span>
          Leading active citizen volunteers verified in municipal ward initiatives.
        </span>
      </div>
    </Card>
  );
}
