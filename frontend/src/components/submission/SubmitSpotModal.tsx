import React, { useState } from 'react';
import {
  X,
  Landmark,
  Upload,
  ChevronDown,
  RotateCcw,
  Maximize2,
  Plus,
  Play,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';

export const SubmitSpotModal: React.FC = () => {
  const { isSubmitSpotOpen, setIsSubmitSpotOpen, addContribution, showToast } = useMapStore();
  const [currentStep, setCurrentStep] = useState(3); // Default to Step 3 as tested & shown in Image 3
  const [landmarkTitle, setLandmarkTitle] = useState('AHSAN MANZIL');
  const [bnName, setBnName] = useState('আহসান মঞ্জিল');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [periodEra, setPeriodEra] = useState('Nawab Era of Bengal (1859–1872 CE)');
  const [architecturalStyle, setArchitecturalStyle] = useState('Indo-Saracenic Revival & Neoclassical');
  const [timelineDescription, setTimelineDescription] = useState(
    'Bangladesh coloured in a mesmerizing architecture and historical overview written on the history of Dhaka. This historic landmark was constructed on the shores of Dhaka.'
  );
  const [folkloreText, setFolkloreText] = useState('Auto-complete');
  const [rotationAngle, setRotationAngle] = useState(0);

  if (!isSubmitSpotOpen) return null;

  const timelineItems = [
    { year: '1678', label: 'Construction' },
    { year: '1888', label: 'British Acquisition' },
    { year: '1888', label: 'British Acquisition' },
    { year: '1986', label: 'British Communities' },
    { year: '1937', label: 'British Countures' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      addContribution({
        id: `contrib-${Date.now()}`,
        title: landmarkTitle,
        category: 'Heritage',
        status: 'Pending',
        points: 150,
        modifiedDate: 'Just now',
        imageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=600&q=80',
      });
      showToast(`Spot "${landmarkTitle}" submitted for community verification! (+150 pts)`);
      setIsSubmitSpotOpen(false);
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/45 backdrop-blur-md animate-in fade-in select-none">
      {/* Translucent Glass Modal Dialog */}
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl shadow-2xl border border-white/90 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200/70 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-xs sm:text-sm md:text-base font-extrabold text-slate-900 tracking-wide uppercase truncate">
              SUBMIT A SPOT: HISTORICAL & MULTIMEDIA DATA{' '}
              <span className="text-slate-500 font-semibold normal-case text-[11px] sm:text-xs">
                (Step {currentStep} of 5)
              </span>
            </h2>
          </div>
          <button
            onClick={() => setIsSubmitSpotOpen(false)}
            className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
          >
            <span className="hidden sm:inline">Cancel</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Stepper Pills */}
        <div className="px-3 sm:px-6 pt-2.5 sm:pt-3 pb-1 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar border-b border-slate-100 bg-white/40">
          {[
            { num: 1, label: 'Basics' },
            { num: 2, label: 'Heritage & Era' },
            { num: 3, label: 'Timeline & Media' },
            { num: 4, label: 'Archival Records' },
            { num: 5, label: 'Review & Submit' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                currentStep === s.num
                  ? 'bg-slate-900 text-white shadow-sm'
                  : currentStep > s.num
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] bg-white/20">
                {s.num}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6">
          
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                Step 1: Basic Spot Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Spot / Landmark Name (English)</label>
                  <input
                    type="text"
                    value={landmarkTitle}
                    onChange={(e) => setLandmarkTitle(e.target.value)}
                    className="w-full text-sm font-bold text-slate-900 bg-white/80 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                    placeholder="e.g., Ahsan Manzil, Panam City"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Bengali Nomenclature (বাংলা নাম)</label>
                  <input
                    type="text"
                    value={bnName}
                    onChange={(e) => setBnName(e.target.value)}
                    className="w-full text-sm font-bold text-slate-900 bg-white/80 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                    placeholder="যেমনঃ আহসান মঞ্জিল"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase">Division</label>
                    <select
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 bg-white/80 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                    >
                      {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase">District</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full text-xs font-bold text-slate-900 bg-white/80 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Era, Dynasty & Architecture */}
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                Step 2: Historical Significance & Architecture
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Period / Ruling Dynasty</label>
                  <input
                    type="text"
                    value={periodEra}
                    onChange={(e) => setPeriodEra(e.target.value)}
                    className="w-full text-sm font-bold text-slate-900 bg-white/80 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase">Architectural Style</label>
                  <input
                    type="text"
                    value={architecturalStyle}
                    onChange={(e) => setArchitecturalStyle(e.target.value)}
                    className="w-full text-sm font-bold text-slate-900 bg-white/80 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400/40 mt-1"
                  />
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Our peer-review council automatically correlates architectural styles against the Archaeological Survey of Bangladesh database.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Timeline & Folklore & Media (Exact match for Image 3 & Views.test.tsx) */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
              {/* Left Column (Span 6) */}
              <div className="lg:col-span-6 space-y-4">
                {/* Stepper Node & Landmark Title */}
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300 shadow-sm shrink-0">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                        LANDMARK TITLE
                      </label>
                      <input
                        type="text"
                        value={landmarkTitle}
                        onChange={(e) => setLandmarkTitle(e.target.value)}
                        className="w-full text-base font-extrabold text-slate-900 bg-white/70 px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 mt-0.5"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium ml-12 mt-1">
                    Add historical details...
                  </p>
                </div>

                {/* Historical Timeline Section */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider block">
                    HISTORICAL TIMELINE
                  </label>
                  <textarea
                    rows={3}
                    value={timelineDescription}
                    onChange={(e) => setTimelineDescription(e.target.value)}
                    className="w-full text-xs text-slate-700 bg-white/70 p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 leading-relaxed resize-none"
                  />

                  {/* Timeline Items List */}
                  <div className="space-y-1.5 pt-1">
                    {timelineItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 px-3 py-2 bg-white/60 hover:bg-white rounded-xl border border-slate-200/80 transition-all text-xs"
                      >
                        <span className="font-mono font-bold text-slate-700 w-12 shrink-0">
                          {item.year}
                        </span>
                        <span className="font-medium text-slate-800 truncate flex-1">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Folklore & Lore Section */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider block">
                    FOLKLORE & LORE
                  </label>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                    AI suggested auto-complete entry soon - validate and share the lore, folklore, and significant detected narratives.
                  </p>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">
                      Legend title
                    </label>
                    <div className="relative">
                      <select
                        value={folkloreText}
                        onChange={(e) => setFolkloreText(e.target.value)}
                        className="w-full text-xs font-semibold text-slate-800 bg-white/70 px-3 py-2 rounded-xl border border-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-400/40 cursor-pointer"
                      >
                        <option value="Auto-complete">Auto-complete: French Trading Post & Nawabi Tales</option>
                        <option value="Tornado Reconstruction">Legend of Nawab Ahsanullah's Reconstruction (1888)</option>
                        <option value="Buriganga River Gateway">The Sacred Buriganga Water Gate and Flotilla</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Span 6) */}
              <div className="lg:col-span-6 space-y-4">
                {/* 3D / Panorama Preview Viewport */}
                <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=800&q=80"
                    alt="Ahsan Manzil 3D Preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ transform: `rotateY(${rotationAngle}deg)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* 3D / Fullscreen Floating Controls */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
                    <button
                      onClick={() => setRotationAngle((prev) => (prev + 45) % 360)}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
                      title="Rotate 3D View"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sync Instructions */}
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  Drag and drop historical photos and recent drone videos sync them to these details to specific dates.
                </p>

                {/* Multimedia Upload Rows mapped to Timeline Dates */}
                <div className="space-y-2.5">
                  {/* Row 1: 1678 -> Photo Grid */}
                  <div className="flex items-center gap-3 bg-white/60 p-2.5 rounded-2xl border border-slate-200/70">
                    <span className="font-mono text-xs font-bold text-slate-700 w-10 shrink-0">
                      1678
                    </span>
                    <div className="flex items-center gap-1.5 flex-1">
                      <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-300">
                        <img
                          src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=120&q=80"
                          alt="archive"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-300">
                        <img
                          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=120&q=80"
                          alt="archive"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-300">
                        <img
                          src="https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=120&q=80"
                          alt="archive"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="w-9 h-9 rounded-lg border border-dashed border-slate-400 hover:border-emerald-500 text-slate-400 hover:text-emerald-600 flex items-center justify-center transition-colors cursor-pointer">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Row 2: 1888 -> Historical Photo Uploading */}
                  <div className="flex items-center gap-3 bg-white/60 p-2.5 rounded-2xl border border-slate-200/70">
                    <span className="font-mono text-xs font-bold text-slate-700 w-10 shrink-0">
                      1888
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span className="flex items-center gap-1">
                          <Upload className="w-3 h-3 text-emerald-600" />
                          Historical Photo Uploading...
                        </span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-[72%] h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: 1970 -> Historical Drone Uploading */}
                  <div className="flex items-center gap-3 bg-white/60 p-2.5 rounded-2xl border border-slate-200/70">
                    <span className="font-mono text-xs font-bold text-slate-700 w-10 shrink-0">
                      1970
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span className="flex items-center gap-1">
                          <Upload className="w-3 h-3 text-cyan-600" />
                          Historical Drone Uploading...
                        </span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-[45%] h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: 2000 -> Video Thumbnail */}
                  <div className="flex items-center gap-3 bg-white/60 p-2.5 rounded-2xl border border-slate-200/70">
                    <span className="font-mono text-xs font-bold text-slate-700 w-10 shrink-0">
                      2000
                    </span>
                    <div className="relative w-28 h-10 rounded-xl overflow-hidden shadow-sm shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80"
                        alt="drone footage"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-white text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Archival Citations & Documents */}
          {currentStep === 4 && (
            <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                Step 4: Archival Sources & Field Citations
              </h3>
              <div className="space-y-3">
                <div className="p-3.5 bg-white/70 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Primary Deed or Registration Document</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Upload land registry, colonial gazetteers, or waqf deeds to confirm architectural provenance.
                  </p>
                  <div className="p-3 rounded-xl border border-dashed border-slate-300 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 cursor-pointer hover:border-emerald-500">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Upload Document File (PDF/TIFF)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Step 5: Submission Summary & Peer Review
              </h3>
              <div className="bg-white/80 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Landmark:</span>
                  <span className="font-extrabold text-slate-900">{landmarkTitle} ({bnName})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Region:</span>
                  <span className="font-bold text-slate-800">{district}, {division}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Era & Architecture:</span>
                  <span className="font-bold text-slate-800">{periodEra}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Timeline Milestones:</span>
                  <span className="font-bold text-slate-800">5 Chronological Events Linked</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-extrabold pt-1">
                  <span>Contributor XP Bonus:</span>
                  <span>+150 Points</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer: PREVIOUS STEP & NEXT STEP */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-white/50 border-t border-slate-200/70 flex items-center justify-between gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all disabled:opacity-40 cursor-pointer"
          >
            PREVIOUS STEP
          </button>
          
          <button
            onClick={handleNext}
            className="rainbow-glow-border px-5 sm:px-8 py-2 sm:py-2.5 text-xs font-extrabold text-slate-900 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {currentStep === 5 ? 'FINISH SUBMISSION' : 'NEXT STEP'}
          </button>
        </div>

      </div>
    </div>
  );
};
