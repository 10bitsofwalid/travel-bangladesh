import React, { useState } from 'react';
import {
  CheckCircle2,
  Bell,
  Lock,
  CreditCard,
  Camera,
  Trophy,
  Play,
  MapPin,
  ShieldCheck,
  Edit,
  LogOut,
  X,
  Check
} from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { MOCK_CONTRIBUTIONS, MOCK_SAVED_ITINERARIES } from '../../data/mockData';

export const MyAccountView: React.FC = () => {
  const {
    userProfile,
    toggleSetting,
    setActiveView,
    updateUserProfile,
    updateGamificationProgress,
    setIsVirtualTourOpen,
    setLightboxImage,
    showToast,
  } = useMapStore();

  const [levelProgress, setLevelProgress] = useState(userProfile.gamification.levelProgress);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [editEmail, setEditEmail] = useState(userProfile.email);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLevelProgress(val);
    updateGamificationProgress(val);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName.trim() || userProfile.name,
      phone: editPhone.trim() || userProfile.phone,
      email: editEmail.trim() || userProfile.email,
    });
    setIsEditingProfile(false);
    showToast('Profile updated successfully!');
  };

  const handleLogout = () => {
    showToast('Signed out of ExploreBD session.');
    setActiveView('explore');
  };

  return (
    <div className="relative w-full h-full pt-16 sm:pt-20 px-3 sm:px-6 pb-12 overflow-y-auto z-10 select-none">
      {/* 3-Column Bento Grid matching Image 1 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        
        {/* Left Column (Span 4): Cards 1 & 2 */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-5">
          
          {/* Card 1: PROFILE SUMMARY (numbered 1) */}
          <div className="glass-panel-card rounded-3xl p-4 sm:p-5 relative shadow-xl border border-white/80">
            {/* Number badge at top right */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center justify-center">
              1
            </div>

            <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase mb-3 sm:mb-4">
              PROFILE SUMMARY
            </h3>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4">
              {/* Circular Avatar with Radiant Emerald Ring */}
              <div className="relative shrink-0">
                <div className="absolute -inset-1.5 rounded-full bg-emerald-400/40 blur-md animate-pulse" />
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-emerald-400 shadow-md"
                />
              </div>

              {/* User Details */}
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {userProfile.name}
                </h2>

                {/* Account Verification & Contributor Badge */}
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200/80 w-fit mx-auto sm:mx-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-bold">
                    Account Verification
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold">
                    • Level {userProfile.contributorLevel} Contributor
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 mt-2.5 space-y-0.5">
                  <p>Email: <span className="text-slate-800 font-medium">{userProfile.email}</span></p>
                  <p>Phone: <span className="text-slate-800 font-medium">{userProfile.phone}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: GAMIFICATION & STATUS (numbered 2) */}
          <div className="glass-panel-card rounded-3xl p-4 sm:p-5 relative shadow-xl border border-white/80 space-y-3 sm:space-y-4">
            {/* Number badge at top right */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center justify-center">
              2
            </div>

            <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
              GAMIFICATION & STATUS
            </h3>

            {/* Verified Heritage Expert Badge */}
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs bg-emerald-100/60 px-3 py-1.5 rounded-2xl w-fit border border-emerald-300/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{userProfile.gamification.statusTitle}</span>
            </div>

            {/* Progress Bar with Camera & Trophy milestone icons */}
            <div className="relative pt-1">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 rounded-full bg-slate-200/80 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
                <div className="flex items-center gap-1 text-slate-400 bg-white/70 px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
                  <Camera className="w-3 h-3 text-slate-600" />
                  <Trophy className="w-3 h-3 text-amber-500" />
                </div>
              </div>
            </div>

            {/* 3 Stat Counters */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center pt-2">
              <div className="p-1.5 sm:p-2 bg-white/60 rounded-2xl border border-slate-200/60">
                <div className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {userProfile.gamification.historicalValidations}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                  Historical validations
                </div>
              </div>
              <div className="p-1.5 sm:p-2 bg-white/60 rounded-2xl border border-slate-200/60">
                <div className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {userProfile.gamification.landmarkPhotoApprovals}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                  Landmark photo approvals
                </div>
              </div>
              <div className="p-1.5 sm:p-2 bg-white/60 rounded-2xl border border-slate-200/60">
                <div className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {userProfile.gamification.communityAwards}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                  Community awards
                </div>
              </div>
            </div>

            {/* Level Slider Track with Glowing Dot */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={levelProgress}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  aria-label="Level progress"
                />
              </div>
              <span className="text-xs font-bold text-slate-700 shrink-0">
                Level {userProfile.gamification.currentLevel} ({levelProgress}%)
              </span>
            </div>
          </div>

        </div>

        {/* Center Column (Span 4): Card 3A (MY CONTRIBUTIONS) */}
        <div className="lg:col-span-4">
          <div className="glass-panel-card rounded-3xl p-5 relative shadow-xl border border-white/80 h-full flex flex-col justify-between">
            {/* Number badge at top right */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center justify-center">
              3A
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
                MY CONTRIBUTIONS
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 mb-4">
                Recent submissions
              </p>

              {/* Grid of 2 items */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Item 1: Ahsan Manzil */}
                <div
                  onClick={() => setLightboxImage({ src: MOCK_CONTRIBUTIONS[0].imageUrl, title: MOCK_CONTRIBUTIONS[0].title })}
                  className="bg-white/70 hover:bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-sm space-y-2 cursor-pointer transition-all"
                >
                  <div className="h-20 rounded-xl overflow-hidden shadow-sm relative">
                    <img
                      src={MOCK_CONTRIBUTIONS[0].imageUrl}
                      alt={MOCK_CONTRIBUTIONS[0].title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <span className="badge-approved">Approved</span>
                    <p className="text-[10px] text-slate-600 font-semibold mt-1.5">
                      Contribution points {MOCK_CONTRIBUTIONS[0].points}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5">
                      Modified on: {MOCK_CONTRIBUTIONS[0].modifiedDate}
                    </p>
                  </div>
                </div>

                {/* Item 2: Sylhet Tea Gardens */}
                <div
                  onClick={() => setLightboxImage({ src: MOCK_CONTRIBUTIONS[1].imageUrl, title: MOCK_CONTRIBUTIONS[1].title })}
                  className="bg-white/70 hover:bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-sm space-y-2 cursor-pointer transition-all"
                >
                  <div className="h-20 rounded-xl overflow-hidden shadow-sm relative">
                    <img
                      src={MOCK_CONTRIBUTIONS[1].imageUrl}
                      alt={MOCK_CONTRIBUTIONS[1].title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/40 animate-ping" />
                    </div>
                  </div>
                  <div>
                    <span className="badge-pending">Pending</span>
                    <p className="text-[10px] text-slate-600 font-semibold mt-1.5">
                      Contribution points {MOCK_CONTRIBUTIONS[1].points}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5">
                      Modified on: {MOCK_CONTRIBUTIONS[1].modifiedDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 (Wide Card): Ahsan Manzil VR Panorama */}
              <div className="bg-white/70 rounded-2xl p-3 border border-slate-200/80 shadow-sm space-y-2.5 mb-4">
                <div
                  onClick={() => setIsVirtualTourOpen(true)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative w-16 h-14 rounded-xl overflow-hidden shadow-sm shrink-0">
                    <img
                      src={MOCK_CONTRIBUTIONS[2].imageUrl}
                      alt={MOCK_CONTRIBUTIONS[2].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-emerald-600/40 transition-colors">
                      <Play className="w-4 h-4 fill-white text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                      AHSAN MANZIL:
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-600 truncate">
                      Historical Data VR Panorama
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-3/4 h-full bg-emerald-500 rounded-full" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="badge-approved">Approved</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span>Contribution points {MOCK_CONTRIBUTIONS[2].points}</span>
                  <span>Modified on {MOCK_CONTRIBUTIONS[2].modifiedDate}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: EDIT PROFILE | LOGOUT */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsEditingProfile(true)}
                className="py-2.5 px-4 rounded-full text-xs font-bold bg-white/80 hover:bg-white text-slate-800 border border-slate-200/80 shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02]"
              >
                <Edit className="w-3.5 h-3.5 text-slate-600" />
                <span>EDIT PROFILE</span>
              </button>
              <button
                onClick={handleLogout}
                className="py-2.5 px-4 rounded-full text-xs font-bold bg-white/80 hover:bg-white text-slate-800 border border-slate-200/80 shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02]"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-600" />
                <span>LOGOUT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Span 4): Cards 3B & 3C */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Card 3B: SAVED ITINERARIES (numbered 3B) */}
          <div className="glass-panel-card rounded-3xl p-5 relative shadow-xl border border-white/80">
            {/* Number badge at top right */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center justify-center">
              3B
            </div>

            <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
              SAVED ITINERARIES
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 mb-4">
              Upcoming routes
            </p>

            <div className="space-y-3">
              {MOCK_SAVED_ITINERARIES.map((itin) => (
                <div
                  key={itin.id}
                  onClick={() => setActiveView('planner')}
                  className="bg-white/70 hover:bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-3 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {itin.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1 text-emerald-700 hover:underline">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{itin.guideLink}</span>
                      </div>
                      <div className="flex items-center gap-1 text-cyan-700 hover:underline">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{itin.travelMapLink}</span>
                      </div>
                    </div>
                  </div>

                  {/* Miniature Map Preview Thumbnail */}
                  <div className="w-16 h-14 rounded-xl overflow-hidden border border-slate-300 shadow-inner shrink-0 bg-emerald-50 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/80 to-teal-200/60 p-1 flex items-center justify-center">
                      <svg className="w-full h-full text-emerald-600" viewBox="0 0 40 40">
                        <path
                          d="M 10 32 Q 22 20 28 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeDasharray="2 2"
                        />
                        <circle cx="10" cy="32" r="2.5" fill="#10b981" />
                        <circle cx="28" cy="10" r="2.5" fill="#06b6d4" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3C: ACCOUNT SETTINGS (numbered 3C) */}
          <div className="glass-panel-card rounded-3xl p-5 relative shadow-xl border border-white/80 space-y-3.5">
            {/* Number badge at top right */}
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center justify-center">
              3C
            </div>

            <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase mb-3">
              ACCOUNT SETTINGS
            </h3>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <Bell className="w-4 h-4 text-slate-500" />
                <span>Notifications</span>
              </div>
              <div
                onClick={() => toggleSetting('notifications')}
                className={`switch-track ${userProfile.settings.notifications ? 'active-emerald' : ''}`}
                role="switch"
                aria-checked={userProfile.settings.notifications}
                tabIndex={0}
              >
                <div className="switch-thumb" />
              </div>
            </div>

            {/* Security */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <Lock className="w-4 h-4 text-slate-500" />
                <span>Security</span>
              </div>
              <div
                onClick={() => toggleSetting('security')}
                className={`switch-track ${userProfile.settings.security ? 'active-emerald' : ''}`}
                role="switch"
                aria-checked={userProfile.settings.security}
                tabIndex={0}
              >
                <div className="switch-thumb" />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CreditCard className="w-4 h-4 text-slate-500" />
                <span>Payment Methods</span>
              </div>
              <div
                onClick={() => toggleSetting('paymentMethods')}
                className={`switch-track ${userProfile.settings.paymentMethods ? 'active-emerald' : ''}`}
                role="switch"
                aria-checked={userProfile.settings.paymentMethods}
                tabIndex={0}
              >
                <div className="switch-thumb" />
              </div>
            </div>

            {/* Verified Guide Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Guide Status</span>
              </div>
              <div
                onClick={() => toggleSetting('verifiedGuideStatus')}
                className={`switch-track ${userProfile.settings.verifiedGuideStatus ? 'active-emerald' : ''}`}
                role="switch"
                aria-checked={userProfile.settings.verifiedGuideStatus}
                tabIndex={0}
              >
                <div className="switch-thumb" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl border border-white/90 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Edit User Profile
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 bg-white/80 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 bg-white/80 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 bg-white/80 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 rounded-full hover:bg-emerald-600 transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
