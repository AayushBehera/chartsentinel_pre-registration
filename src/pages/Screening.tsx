import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  institution: z.string().min(2, 'Institution name required'),
  aum: z.string().min(1, 'AUM selection required'),
});

type FormData = z.infer<typeof schema>;

export function Screening() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate('/success');
  };

  return (
    <div className="min-h-screen pt-40 px-6 pb-24 relative z-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl card-base p-8 md:p-10 relative overflow-hidden border border-[#26262f]"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1c1c24]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#d946ef] to-[#a21caf]"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ boxShadow: '0 0 20px rgba(217, 70, 239, 0.5)' }}
          />
        </div>

        {/* Header */}
        <div className="mb-10 text-center border-b border-[#26262f] pb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`step-${step}`}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Applicant Screening</h2>
            <p className="text-[#6b7280] text-[10px] uppercase tracking-[0.15em]">
              {step === 1 && "Personal Information"}
              {step === 2 && "Institutional Details"}
              {step === 3 && "Final Verification"}
            </p>
            <p className="text-[#6b7280] text-[9px] mt-4 uppercase tracking-[0.12em]">Step {step} of 3</p>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-semibold mb-3">Full Name</label>
                  <input
                    {...register('fullName')}
                    className="w-full bg-[rgba(22,22,29,0.5)] border border-[#26262f] rounded-xl px-4 py-3.5 text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#d946ef]/40 focus:border-[#d946ef]/40 transition-all text-sm"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-[#ef4444] text-[10px] mt-2 font-semibold">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-semibold mb-3">Corporate Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full bg-[rgba(22,22,29,0.5)] border border-[#26262f] rounded-xl px-4 py-3.5 text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#d946ef]/40 focus:border-[#d946ef]/40 transition-all text-sm"
                    placeholder="name@institution.com"
                  />
                  {errors.email && <p className="text-[#ef4444] text-[10px] mt-2 font-semibold">{errors.email.message}</p>}
                </div>
                <motion.button
                  type="button"
                  onClick={() => setStep(2)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white font-semibold uppercase tracking-[0.12em] text-[10px] rounded-xl transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_40px_rgba(217,70,239,0.5)] flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-semibold mb-3">Institution Name</label>
                  <input
                    {...register('institution')}
                    className="w-full bg-[rgba(22,22,29,0.5)] border border-[#26262f] rounded-xl px-4 py-3.5 text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#d946ef]/40 focus:border-[#d946ef]/40 transition-all text-sm"
                    placeholder="e.g., Citadel, Jane Street"
                  />
                  {errors.institution && <p className="text-[#ef4444] text-[10px] mt-2 font-semibold">{errors.institution.message}</p>}
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.12em] text-[#9ca3af] font-semibold mb-3">Assets Under Management</label>
                  <select
                    {...register('aum')}
                    className="w-full bg-[rgba(22,22,29,0.5)] border border-[#26262f] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#d946ef]/40 focus:border-[#d946ef]/40 transition-all appearance-none text-sm"
                  >
                    <option value="" className="bg-[#16161d]">Select AUM Range</option>
                    <option value="<10M" className="bg-[#16161d]">&lt; $10M</option>
                    <option value="10M-100M" className="bg-[#16161d]">$10M - $100M</option>
                    <option value="100M-1B" className="bg-[#16161d]">$100M - $1B</option>
                    <option value=">1B" className="bg-[#16161d]">&gt; $1B</option>
                  </select>
                  {errors.aum && <p className="text-[#ef4444] text-[10px] mt-2 font-semibold">{errors.aum.message}</p>}
                </div>
                <div className="flex gap-4 mt-6">
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    whileTap={{ scale: 0.98 }}
                    className="w-1/3 py-4 bg-transparent border border-[#26262f] rounded-xl text-[#9ca3af] hover:text-white hover:border-white/20 uppercase tracking-[0.12em] text-[10px] font-semibold transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setStep(3)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-2/3 py-4 bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white font-semibold uppercase tracking-[0.12em] text-[10px] rounded-xl transition-all shadow-[0_0_30px_rgba(217,70,239,0.3)]"
                  >
                    Review
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="p-6 bg-[rgba(217,70,239,0.06)] rounded-xl border border-[#d946ef]/25">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d946ef] mt-1.5 flex-shrink-0 shadow-[0_0_8px_#d946ef]" />
                    <p className="text-sm text-[#9ca3af] leading-relaxed">
                      By submitting this application, you confirm that you represent a legitimate institutional trading entity and agree to our verification process.
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#d946ef] text-[10px] uppercase tracking-[0.12em] font-semibold mt-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-[#d946ef] shadow-[0_0_8px_#d946ef]"
                    />
                    <span>Secure End-to-End Transmission</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <motion.button
                    type="button"
                    onClick={() => setStep(2)}
                    whileTap={{ scale: 0.98 }}
                    className="w-1/3 py-4 bg-transparent border border-[#26262f] rounded-xl text-[#9ca3af] hover:text-white hover:border-white/20 uppercase tracking-[0.12em] text-[10px] font-semibold transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={!isValid}
                    whileHover={isValid ? { scale: 1.02, boxShadow: "0 0 40px rgba(217,70,239,0.5)" } : {}}
                    whileTap={isValid ? { scale: 0.98 } : {}}
                    className="w-2/3 py-4 bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white font-semibold uppercase tracking-[0.12em] text-[10px] rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(217,70,239,0.3)]"
                  >
                    Submit Application
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
