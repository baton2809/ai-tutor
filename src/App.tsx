import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Square,
  Mic,
  MicOff,
  Settings,
  Upload,
  Github,
  FileText,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Target,
  Brain,
  Zap,
  Users,
  ChevronRight,
  Download,
  RotateCcw,
  Lightbulb,
  BarChart3,
  Video,
  MessageSquare,
  Star,
  AlertCircle,
} from 'lucide-react';

const AITrainer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [currentScore, setCurrentScore] = useState(8.1);
  const [stressLevel, setStressLevel] = useState(65);
  const [selectedProject, setSelectedProject] = useState('foodtech');
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState({
    foodtech: {
      name: 'FoodTech Startup',
      readiness: 67,
      files: ['presentation.pptx', 'business_plan.pdf'],
      github: 'github.com/user/foodtech-app',
      lastSession: '2 часа назад',
    },
    diploma: {
      name: 'ML в медицине',
      readiness: 23,
      files: ['thesis.docx', 'research_data.xlsx'],
      github: 'github.com/user/medical-ml',
      lastSession: 'Вчера',
    },
  });

  // Add Project Modal Component
  const AddProjectModal = () => {
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('startup');
    const [githubRepo, setGithubRepo] = useState('');
    const [files, setFiles] = useState([]);
    const [step, setStep] = useState(1);

    const handleAddProject = () => {
      const newProjectId = projectName.toLowerCase().replace(/\s+/g, '-');
      const newProject = {
        name: projectName,
        readiness: 0,
        files: files,
        github: githubRepo,
        lastSession: 'Никогда',
        type: projectType,
      };

      setProjects((prev) => ({
        ...prev,
        [newProjectId]: newProject,
      }));

      setSelectedProject(newProjectId);
      setShowAddProject(false);

      // Reset form
      setProjectName('');
      setProjectType('startup');
      setGithubRepo('');
      setFiles([]);
      setStep(1);
    };

    if (!showAddProject) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Добавить новый проект</h3>
            <button
              onClick={() => setShowAddProject(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название проекта
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Например: Мой стартап"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тип проекта
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="startup">🚀 Стартап / Питч</option>
                  <option value="diploma">🎓 Диплом / Научная работа</option>
                  <option value="business">💼 Бизнес-проект</option>
                  <option value="technical">⚡ Техническая презентация</option>
                </select>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!projectName}
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Далее: Файлы и GitHub
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub репозиторий (опционально)
                </label>
                <input
                  type="text"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  placeholder="github.com/user/repository"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Загрузить файлы
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-sm text-gray-600 mb-2">
                    Перетащите файлы или нажмите для выбора
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pptx,.pdf,.docx,.txt"
                    onChange={(e) => {
                      const fileNames = Array.from(e.target.files).map(
                        (f) => f.name
                      );
                      setFiles(fileNames);
                    }}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm cursor-pointer hover:bg-blue-600"
                  >
                    Выбрать файлы
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm font-medium text-gray-700">
                      Загружено файлов:
                    </p>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="text-xs text-gray-600 flex items-center"
                      >
                        <FileText size={12} className="mr-1" />
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300"
                >
                  Назад
                </button>
                <button
                  onClick={handleAddProject}
                  className="flex-1 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                >
                  Создать проект
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const skills = {
    persuasiveness: 82,
    clarity: 65,
    stress: 45,
    knowledge: 78,
  };

  const achievements = [
    { name: 'Железные аргументы', icon: '💪', unlocked: true },
    { name: 'Попадание в цель', icon: '🎯', unlocked: true },
    { name: 'Секретный код', icon: '🔐', unlocked: true, isNew: true },
    { name: 'Мастер Q&A', icon: '❓', unlocked: false },
  ];

  // Dashboard Component
  const Dashboard = () => (
    <div className="flex h-full">
      {/* Left Panel - Projects */}
      <div className="w-80 bg-slate-50 p-6 border-r">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">📁 Мои проекты</h2>
          <button className="text-blue-600 hover:text-blue-800">
            <Upload size={20} />
          </button>
        </div>

        {Object.entries(projects).map(([key, project]) => (
          <div
            key={key}
            className={`p-4 rounded-lg mb-4 cursor-pointer transition-all ${
              selectedProject === key
                ? 'bg-blue-50 border-2 border-blue-200'
                : 'bg-white border border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedProject(key)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{project.name}</h3>
              <span className="text-sm text-gray-500">
                {project.readiness}%
              </span>
            </div>

            <div className="space-y-1 mb-3">
              {project.files.map((file) => (
                <div
                  key={file}
                  className="flex items-center text-sm text-gray-600"
                >
                  <FileText size={14} className="mr-2" />
                  {file}
                </div>
              ))}
              <div className="flex items-center text-sm text-gray-600">
                <Github size={14} className="mr-2" />
                {project.github}
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${project.readiness}%` }}
              />
            </div>

            <div className="text-xs text-gray-500 mt-2">
              Последняя сессия: {project.lastSession}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowAddProject(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-all"
        >
          ➕ Добавить проект
        </button>
      </div>

      {/* Center Panel - Training Zone */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 h-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🎯 Готовы к тренировке "{projects[selectedProject].name}"?
            </h1>

            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <div className="text-4xl">🤖</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-lg text-gray-700 italic">
                "Привет! Я изучил ваш проект. Начнем с вопросов по архитектуре?
                Или хотите полную симуляцию питча?"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg transition-all transform hover:scale-105"
              onClick={() => setActiveTab('training')}
            >
              <div className="text-2xl mb-2">🎮</div>
              <div className="font-semibold">Быстрая тренировка</div>
              <div className="text-sm opacity-90">5-10 минут</div>
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-lg transition-all transform hover:scale-105"
              onClick={() => setActiveTab('training')}
            >
              <div className="text-2xl mb-2">🔥</div>
              <div className="font-semibold">Полная симуляция</div>
              <div className="text-sm opacity-90">20-30 минут</div>
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg transition-all transform hover:scale-105"
              onClick={() => setActiveTab('analysis')}
            >
              <div className="text-2xl mb-2">📝</div>
              <div className="font-semibold">Анализ проекта</div>
              <div className="text-sm opacity-90">AI-аудит</div>
            </button>

            <button
              className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg transition-all transform hover:scale-105"
              onClick={() => setActiveTab('settings')}
            >
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-semibold">Настройки</div>
              <div className="text-sm opacity-90">Персонализация</div>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Progress */}
      <div className="w-80 bg-slate-50 p-6 border-l">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📈 Ваш прогресс
          </h3>

          {Object.entries(skills).map(([skill, value]) => {
            const skillNames = {
              persuasiveness: { name: 'Убедительность', icon: '🎯' },
              clarity: { name: 'Четкость речи', icon: '🗣' },
              stress: { name: 'Стрессоустойчивость', icon: '⚡' },
              knowledge: { name: 'Знание проекта', icon: '🧠' },
            };

            return (
              <div key={skill} className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {skillNames[skill].icon} {skillNames[skill].name}
                  </span>
                  <span className="text-sm text-gray-500">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      value >= 80
                        ? 'bg-green-500'
                        : value >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            🏆 Достижения
          </h3>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  achievement.unlocked
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">{achievement.icon}</span>
                  <span
                    className={`text-sm ${
                      achievement.unlocked ? 'text-gray-800' : 'text-gray-400'
                    }`}
                  >
                    {achievement.name}
                  </span>
                </div>
                {achievement.isNew && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    new
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📅 Последние сессии
          </h3>
          <div className="space-y-3">
            {[
              { time: '2 часа назад', type: 'Питч', score: '8.2/10' },
              { time: 'Вчера', type: 'Q&A тренировка', score: '7.1/10' },
              {
                time: '3 дня назад',
                type: 'Техническое интервью',
                score: '6.8/10',
              },
            ].map((session, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-800">
                    {session.type}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {session.score}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{session.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Training Component
  const Training = () => {
    const [sessionTime, setSessionTime] = useState('08:23');
    const [aiMessage, setAiMessage] = useState(
      'Интересная идея! А как вы решили проблему с cold storage для продуктов?'
    );
    const [contextInfo, setContextInfo] = useState(
      "Слайд 5: 'Техническое решение'"
    );

    return (
      <div className="h-full bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
            <span className="font-medium">
              Тренировка • {projects[selectedProject].name} • {sessionTime}
            </span>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
          >
            Завершить
          </button>
        </div>

        {/* Main Content */}
        <div className="flex h-full">
          {/* Video Chat Area */}
          <div className="flex-1 p-6">
            {/* AI Mentor Video */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg mb-6 p-8 text-center h-96 flex flex-col justify-center">
              <div className="text-6xl mb-4">🤖</div>
              <div className="text-xl mb-4 font-semibold">AI-Ментор</div>
              <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                <p className="text-lg italic">"{aiMessage}"</p>
              </div>
            </div>

            {/* User Video and Controls */}
            <div className="flex justify-between items-end">
              {/* User Video */}
              <div className="w-48 h-36 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-4xl">👤</div>
                <div className="absolute bottom-2 left-2 text-sm">Вы</div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full ${
                    isMuted ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <button
                  onClick={() => setIsTraining(!isTraining)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
                >
                  {isTraining ? <Pause size={20} /> : <Play size={20} />}
                  <span className="ml-2">
                    {isTraining ? 'Пауза' : 'Продолжить'}
                  </span>
                </button>
              </div>
            </div>

            {/* Live Analysis */}
            <div className="mt-6 bg-black bg-opacity-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">📊 LIVE АНАЛИЗ</h3>
                <span className="text-green-400 font-bold">
                  Score: {currentScore}/10
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Слов/мин</div>
                  <div className="font-bold text-green-400">145 👍</div>
                </div>
                <div>
                  <div className="text-gray-400">Паузы</div>
                  <div className="font-bold text-yellow-400">8сек ⚠️</div>
                </div>
                <div>
                  <div className="text-gray-400">Уверенность</div>
                  <div className="font-bold text-blue-400">7.2/10</div>
                </div>
                <div>
                  <div className="text-gray-400">"эм/эээ"</div>
                  <div className="font-bold text-red-400">3 за мин</div>
                </div>
              </div>
            </div>
          </div>

          {/* Context Panel */}
          <div className="w-80 bg-gray-800 p-6">
            <h3 className="text-lg font-bold mb-4">📋 Умная панель</h3>

            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="font-semibold mb-2">📄 Текущий контекст</div>
                <div className="text-sm text-gray-300">{contextInfo}</div>
                <div className="text-sm text-gray-300 mt-1">
                  GitHub: /api/storage.py
                </div>
              </div>

              <div className="bg-yellow-900 bg-opacity-50 p-4 rounded-lg">
                <div className="font-semibold mb-2">💡 AI видит проблему:</div>
                <div className="text-sm text-yellow-200">
                  "Нет описания холодного хранения в коде"
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="font-semibold mb-2">
                  💬 История вопросов (3)
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>• Архитектура системы</div>
                  <div>• Модель монетизации</div>
                  <div>• Масштабирование</div>
                </div>
              </div>

              <div className="bg-red-900 bg-opacity-50 p-4 rounded-lg">
                <div className="font-semibold mb-2">🎯 Слабые места</div>
                <div className="text-sm text-red-200">⚠️ Монетизация (!)</div>
              </div>

              <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg">
                <div className="font-semibold mb-2">💡 Предложения AI</div>
                <div className="text-sm text-blue-200 space-y-1">
                  <div>• Добавить примеры клиентов</div>
                  <div>• Показать unit economics</div>
                </div>
              </div>

              {/* Stress-O-Meter */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="font-semibold mb-2">😌 Стресс-метр</div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Комфортная зона</span>
                    <span>{100 - stressLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${100 - stressLevel}%` }}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Зона роста</span>
                    <span>{stressLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${stressLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Analysis Component
  const Analysis = () => (
    <div className="p-8 h-full bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📝 AI-Анализ проекта "{projects[selectedProject].name}"
          </h1>
          <p className="text-gray-600">
            Глубокий анализ вашего проекта и презентации
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Heat Map */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">🔥 Heat Map документов</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">📄 presentation.pptx</h3>
                <div className="space-y-2">
                  {[
                    {
                      title: 'Слайд 1: Проблема',
                      status: 'good',
                      color: 'bg-green-200',
                    },
                    {
                      title: 'Слайд 2: Решение',
                      status: 'good',
                      color: 'bg-green-200',
                    },
                    {
                      title: 'Слайд 3: Рынок',
                      status: 'warning',
                      color: 'bg-yellow-200',
                    },
                    {
                      title: 'Слайд 4: Продукт',
                      status: 'good',
                      color: 'bg-green-200',
                    },
                    {
                      title: 'Слайд 5: Технологии',
                      status: 'danger',
                      color: 'bg-red-200',
                    },
                    {
                      title: 'Слайд 6: Бизнес-модель',
                      status: 'danger',
                      color: 'bg-red-200',
                    },
                    {
                      title: 'Слайд 7: Финансы',
                      status: 'warning',
                      color: 'bg-yellow-200',
                    },
                    {
                      title: 'Слайд 8: Команда',
                      status: 'good',
                      color: 'bg-green-200',
                    },
                  ].map((slide, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded ${slide.color} flex justify-between items-center`}
                    >
                      <span className="text-sm font-medium">{slide.title}</span>
                      <span className="text-xs">
                        {slide.status === 'good' && '🟢 AI понимает'}
                        {slide.status === 'warning' &&
                          '🟡 Потенциальные вопросы'}
                        {slide.status === 'danger' && '🔴 Слабые места'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">🐙 GitHub Repository</h3>
                <div className="space-y-2">
                  {[
                    {
                      file: '/src/api/storage.py',
                      issues: 'Нет документации холодного хранения',
                    },
                    {
                      file: '/src/models/pricing.py',
                      issues: 'Отсутствует unit economics',
                    },
                    { file: '/README.md', issues: 'Нет описания архитектуры' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-red-50 p-3 rounded border-l-4 border-red-400"
                    >
                      <div className="font-medium text-sm">{item.file}</div>
                      <div className="text-xs text-red-600 mt-1">
                        ⚠️ {item.issues}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">🎯 Общая оценка</h2>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-blue-600">7.2</div>
                <div className="text-gray-500">из 10</div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Структура</span>
                    <span>8.5/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Убедительность</span>
                    <span>6.1/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: '61%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Техническая глубина</span>
                    <span>7.0/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">🚨 Критические вопросы</h2>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <div className="font-medium text-sm text-red-800">
                    Монетизация
                  </div>
                  <div className="text-xs text-red-600 mt-1">
                    "Как именно вы будете зарабатывать?"
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <div className="font-medium text-sm text-red-800">
                    Конкуренты
                  </div>
                  <div className="text-xs text-red-600 mt-1">
                    "Чем вы лучше Uber Eats?"
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  <div className="font-medium text-sm text-yellow-800">
                    Масштабирование
                  </div>
                  <div className="text-xs text-yellow-600 mt-1">
                    "Как будете расти в других городах?"
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">💡 Рекомендации</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="text-green-600 mt-1">✓</div>
                  <div className="text-sm">
                    Добавьте раздел о unit economics в презентацию
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="text-green-600 mt-1">✓</div>
                  <div className="text-sm">
                    Подготовьте 3-5 кейсов успешных клиентов
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="text-green-600 mt-1">✓</div>
                  <div className="text-sm">
                    Опишите техническую архитектуру в README
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="text-green-600 mt-1">✓</div>
                  <div className="text-sm">
                    Создайте конкурентный анализ с таблицей
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Settings Component
  const Settings = () => (
    <div className="p-8 h-full bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          ⚙️ Настройки тренажера
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Personality */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">🤖 Личность AI-ментора</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Стиль общения
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>Дружелюбный наставник</option>
                  <option>Строгий критик</option>
                  <option>Инвестор из Кремниевой долины</option>
                  <option>Академический профессор</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Уровень сложности вопросов
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="difficulty" className="mr-2" />
                    <span>Базовый - для новичков</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="difficulty"
                      className="mr-2"
                      defaultChecked
                    />
                    <span>Продвинутый - каверзные вопросы</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="difficulty" className="mr-2" />
                    <span>Экспертный - максимальный стресс</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Training Preferences */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              🎯 Предпочтения тренировок
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фокус тренировки
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Убедительность аргументов</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Четкость речи</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Работа со стрессом</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span>Ответы на каверзные вопросы</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Длительность сессии
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>5 минут - быстрая разминка</option>
                  <option>15 минут - стандартная тренировка</option>
                  <option>30 минут - полная симуляция</option>
                  <option>60 минут - марафон</option>
                </select>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">🔗 Интеграции</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <Github className="mr-3 text-gray-600" size={20} />
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-sm text-gray-500">
                      Синхронизация с репозиториями
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Подключено
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <FileText className="mr-3 text-gray-600" size={20} />
                  <div>
                    <div className="font-medium">Google Drive</div>
                    <div className="text-sm text-gray-500">
                      Автоматическая загрузка презентаций
                    </div>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                  Подключить
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <Video className="mr-3 text-gray-600" size={20} />
                  <div>
                    <div className="font-medium">Zoom</div>
                    <div className="text-sm text-gray-500">
                      Тренировка в реальных встречах
                    </div>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                  Подключить
                </button>
              </div>
            </div>
          </div>

          {/* Voice Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              🎤 Настройки голоса и видео
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Голос AI-ментора
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>Мужской голос (Александр)</option>
                  <option>Женский голос (Екатерина)</option>
                  <option>Нейтральный голос</option>
                  <option>Английский акцент</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Скорость речи AI
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  defaultValue="1"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Медленно</span>
                  <span>Нормально</span>
                  <span>Быстро</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span>Включить анализ мимики</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span>Анализ жестов и позы</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Запись тренировочных сессий</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Отмена
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  );

  // Navigation
  const Navigation = () => (
    <div className="bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-800">PitchMaster</span>
          </div>

          <nav className="flex space-x-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🏠 Главная
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'training'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🎯 Тренировка
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'analysis'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 Анализ
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ⚙️ Настройки
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Добро пожаловать, <span className="font-semibold">Александр</span>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            👤
          </div>
        </div>
      </div>
    </div>
  );

  // Main App
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navigation />
      <div className="flex-1 overflow-hidden">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'training' && <Training />}
        {activeTab === 'analysis' && <Analysis />}
        {activeTab === 'settings' && <Settings />}
      </div>
      <AddProjectModal />
    </div>
  );
};

export default AITrainer;
