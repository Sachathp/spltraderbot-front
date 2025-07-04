import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { RegisterData, FormErrors } from '../../types/auth';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Key,
  Sparkles
} from 'lucide-react';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    splinterlands_username: '',
    splinterlands_posting_key: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPostingKey, setShowPostingKey] = useState(false);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const [showSplinterlandsFields, setShowSplinterlandsFields] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer les erreurs quand l'utilisateur tape
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) {
      clearError();
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Validation du nom d'utilisateur
    if (!formData.username.trim()) {
      errors.username = 'Le nom d\'utilisateur est requis';
    } else if (formData.username.length < 3) {
      errors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores';
    }
    
    // Validation de l'email
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
    }
    
    // Validation de la confirmation du mot de passe
    if (!formData.confirm_password) {
      errors.confirm_password = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirm_password) {
      errors.confirm_password = 'Les mots de passe ne correspondent pas';
    }
    
    // Validation optionnelle des champs Splinterlands
    if (formData.splinterlands_posting_key && (!formData.splinterlands_posting_key.startsWith('5') || formData.splinterlands_posting_key.length !== 51)) {
      errors.splinterlands_posting_key = 'La clé de posting doit commencer par 5 et contenir 51 caractères';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await register(formData);
    
    if (result.success) {
      onSuccess?.();
      navigate('/login?registered=true');
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background avec particules */}
      <div className="fixed inset-0 particles-bg opacity-50"></div>
      
      {/* Gradient overlay animé */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-accent-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-success-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-600 to-primary-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-accent-600 to-primary-600 rounded-2xl p-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-center text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            Créer un compte
          </h2>
          <p className="text-center text-lg text-gray-300 mb-2">
            Rejoignez AutoTrader et commencez à trader intelligemment
          </p>
          <p className="text-center text-sm text-gray-400">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="font-medium text-accent-400 hover:text-accent-300 transition-colors">
              Connectez-vous
            </Link>
          </p>
        </div>

        {/* Formulaire */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-card p-8 shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Gestion des erreurs */}
              {error && (
                <div className="bg-danger-500/20 border border-danger-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-danger-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-danger-300">
                        Erreur lors de l'inscription
                      </h3>
                      <div className="mt-1 text-sm text-danger-200">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Nom d'utilisateur */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`glass-card w-full pl-10 pr-3 py-3 rounded-xl bg-white/5 border ${
                      validationErrors.username ? 'border-danger-500/50' : 'border-white/20'
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>
                {validationErrors.username && (
                  <p className="mt-2 text-sm text-danger-400">{validationErrors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`glass-card w-full pl-10 pr-3 py-3 rounded-xl bg-white/5 border ${
                      validationErrors.email ? 'border-danger-500/50' : 'border-white/20'
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200`}
                    placeholder="votre@email.com"
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-2 text-sm text-danger-400">{validationErrors.email}</p>
                )}
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`glass-card w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border ${
                      validationErrors.password ? 'border-danger-500/50' : 'border-white/20'
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Au moins 8 caractères"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Indicateur de force du mot de passe */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < passwordStrength
                              ? passwordStrength <= 2
                                ? 'bg-danger-500'
                                : passwordStrength <= 3
                                ? 'bg-warning-500'
                                : 'bg-success-500'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      {passwordStrength <= 2 && 'Faible'}
                      {passwordStrength === 3 && 'Moyen'}
                      {passwordStrength === 4 && 'Fort'}
                      {passwordStrength === 5 && 'Très fort'}
                    </p>
                  </div>
                )}
                
                {validationErrors.password && (
                  <p className="mt-2 text-sm text-danger-400">{validationErrors.password}</p>
                )}
              </div>

              {/* Confirmation du mot de passe */}
              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirm_password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`glass-card w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border ${
                      validationErrors.confirm_password ? 'border-danger-500/50' : 'border-white/20'
                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Confirmez votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {validationErrors.confirm_password && (
                  <p className="mt-2 text-sm text-danger-400">{validationErrors.confirm_password}</p>
                )}
              </div>

              {/* Section Splinterlands optionnelle */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowSplinterlandsFields(!showSplinterlandsFields)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-accent-400" />
                    <span className="text-sm font-medium text-gray-300">
                      Configuration Splinterlands (optionnel)
                    </span>
                  </div>
                  <div className={`transform transition-transform duration-200 ${showSplinterlandsFields ? 'rotate-180' : ''}`}>
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {showSplinterlandsFields && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="splinterlands_username" className="block text-sm font-medium text-gray-300 mb-2">
                        Nom d'utilisateur Splinterlands
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="splinterlands_username"
                          name="splinterlands_username"
                          type="text"
                          value={formData.splinterlands_username}
                          onChange={handleChange}
                          disabled={isLoading}
                          className="glass-card w-full pl-10 pr-3 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200"
                          placeholder="Votre nom sur Splinterlands"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="splinterlands_posting_key" className="block text-sm font-medium text-gray-300 mb-2">
                        Clé de posting Splinterlands
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="splinterlands_posting_key"
                          name="splinterlands_posting_key"
                          type={showPostingKey ? 'text' : 'password'}
                          value={formData.splinterlands_posting_key}
                          onChange={handleChange}
                          disabled={isLoading}
                          className={`glass-card w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border ${
                            validationErrors.splinterlands_posting_key ? 'border-danger-500/50' : 'border-white/20'
                          } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200`}
                          placeholder="Clé commençant par 5 (51 caractères)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPostingKey(!showPostingKey)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPostingKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {validationErrors.splinterlands_posting_key && (
                        <p className="mt-2 text-sm text-danger-400">{validationErrors.splinterlands_posting_key}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Cette clé permettra d'automatiser vos achats et ventes sur Splinterlands
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bouton d'inscription */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl font-medium transition-all duration-200 ${
                    isLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-accent-600 to-primary-600 hover:from-accent-700 hover:to-primary-700 transform hover:scale-105'
                  } text-white shadow-lg hover:shadow-accent-500/25`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Création du compte...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Créer mon compte
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Séparateur */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-900 text-gray-400">Déjà inscrit ?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-3 px-4 border border-white/20 rounded-xl font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 