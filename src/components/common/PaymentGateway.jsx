import { X, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function PaymentGateway({ amount, onPennies, onCancel, onSuccess }) {
  const [step, setStep] = useState('selection'); // selection, processing, success
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handlePay = () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#F2F2F2] flex items-center justify-between bg-gradient-to-r from-[#21A179] to-[#3A6EA5] text-white">
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Secure Checkout</h3>
            <p className="opacity-80" style={{ fontSize: '12px' }}>Total Amount: ₹{amount}</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {step === 'selection' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  { id: 'upi', name: 'UPI (GPay, PhonePe)', icon: '📱' },
                  { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
                  { id: 'net', name: 'Net Banking', icon: '🏦' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-[#21A179] bg-[#DFF5E6]'
                        : 'border-[#F2F2F2] hover:border-[#21A179]'
                    }`}
                  >
                    <span style={{ fontSize: '24px' }}>{method.icon}</span>
                    <span style={{ fontWeight: '600', color: '#1A1A1A' }}>{method.name}</span>
                    <div className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id ? 'border-[#21A179] bg-[#21A179]' : 'border-[#B3B3B3]'
                    }`}>
                      {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-[#B3B3B3]">
                <ShieldCheck className="w-4 h-4" />
                <span style={{ fontSize: '12px' }}>PCI-DSS Secure Payment</span>
              </div>

              <button
                onClick={handlePay}
                className="w-full bg-[#21A179] text-white py-4 rounded-2xl hover:bg-[#1e8f6b] transition-all shadow-lg hover:shadow-[#21A179]/30"
                style={{ fontWeight: '700', fontSize: '16px' }}
              >
                Pay ₹{amount}
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 border-4 border-[#21A179]/20 border-t-[#21A179] rounded-full animate-spin mx-auto"></div>
              <div>
                <h4 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: '700' }}>Processing Payment...</h4>
                <p className="text-[#555555]">Please do not close or refresh this page</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-[#DFF5E6] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-[#21A179]" />
              </div>
              <div>
                <h4 className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>Payment Successful!</h4>
                <p className="text-[#555555]">Transaction ID: #FK82947209</p>
              </div>
              <p className="text-[#21A179] font-semibold animate-bounce">Redirecting you back...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
