import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'strength',
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  paranoid: false,
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Strength extends Model {
  @Column({
    type: new DataTypes.STRING(128),
  })
  public he: string;

  @Column({
    type: new DataTypes.STRING(128),
  })
  public ar: string;

  @Column({
    type: new DataTypes.STRING(128),
  })
  public ru: string;

  @Column({
    type: new DataTypes.STRING(128),
  })
  public en: string;
}
// setTimeout(() => {
//   Strength.sync({ force: false });
//   const arr = [
//     {
//       en: 'Responsible',
//       ru: 'Ответственный',
//       ar: 'مسؤول',
//       he: 'אחראי',
//     },
//     {
//       en: 'Adaptable',
//       ru: 'Адаптируемый',
//       ar: 'قابل للتكيف',
//       he: 'מסתגל',
//     },
//     {
//       en: 'Team player',
//       ru: 'Командный игрок',
//       ar: 'لاعب فريق',
//       he: 'שחקן קבוצתי',
//     },
//     {
//       en: 'Self-motivated',
//       ru: 'Самомотивированный',
//       ar: 'ذاتي الدافع',
//       he: 'בעל מוטיבציה עצמית',
//     },
//     {
//       en: 'Innovative',
//       ru: 'Инновационный',
//       ar: 'مبتكر',
//       he: 'חדשני',
//     },
//     {
//       en: 'Creative',
//       ru: 'Творческий',
//       ar: 'مبدع',
//       he: 'יצירתי',
//     },
//     {
//       en: 'Problem solver',
//       ru: 'Решатель проблем',
//       ar: 'محلل المشاكل',
//       he: 'פותר בעיות',
//     },
//     {
//       en: 'Analytical',
//       ru: 'Аналитический',
//       ar: 'تحليلي',
//       he: 'אנליטי',
//     },
//     {
//       en: 'Quick learner',
//       ru: 'Быстро обучаемый',
//       ar: 'متعلم سريع',
//       he: 'לומד מהיר',
//     },
//     {
//       en: 'Goal-oriented',
//       ru: 'Ориентированный на цели',
//       ar: 'موجه نحو الهدف',
//       he: 'ממוקד מטרה',
//     },
//     { en: 'Ethical', ru: 'Этичный', ar: 'أخلاقي', he: 'אתי' },
//     {
//       en: 'Organized',
//       ru: 'Организованный',
//       ar: 'منظم',
//       he: 'מאורגן',
//     },
//     {
//       en: 'Trustworthy',
//       ru: 'Заслуживающий доверия',
//       ar: 'جدير بالثقة',
//       he: 'ראוי לאמון',
//     },
//     {
//       en: 'Straightforward',
//       ru: 'Прямолинейный',
//       ar: 'مباشر',
//       he: 'ישר',
//     },
//     {
//       en: 'Diplomatic',
//       ru: 'Дипломатичный',
//       ar: 'دبلوماسي',
//       he: 'דיפלומטי',
//     },
//     { en: 'Tactful', ru: 'Тактичный', ar: 'لبق', he: 'טקטי' },
//     {
//       en: 'Communicative',
//       ru: 'Коммуникабельный',
//       ar: 'اجتماعي',
//       he: 'תקשורתי',
//     },
//     {
//       en: 'Articulate',
//       ru: 'Красноречивый',
//       ar: 'بليغ',
//       he: 'רהוט',
//     },
//     {
//       en: 'Persuasive',
//       ru: 'Убедительный',
//       ar: 'مقنع',
//       he: 'משכנע',
//     },
//     {
//       en: 'Patient',
//       ru: 'Терпеливый',
//       ar: 'صبور',
//       he: 'סבלני',
//     },
//     {
//       en: 'Caring',
//       ru: 'Заботливый',
//       ar: 'مهتم',
//       he: 'אכפתי',
//     },
//     {
//       en: 'Empathetic',
//       ru: 'Эмпатичный',
//       ar: 'تعاطفي',
//       he: 'אמפתי',
//     },
//     {
//       en: 'Initiative',
//       ru: 'Инициативный',
//       ar: 'مبادر',
//       he: 'יוזם',
//     },
//     {
//       en: 'Supportive',
//       ru: 'Поддерживающий',
//       ar: 'داعم',
//       he: 'תומך',
//     },
//     {
//       en: 'Encouraging',
//       ru: 'Воодушевляющий',
//       ar: 'مشجع',
//       he: 'מעודד',
//     },
//     {
//       en: 'Inspirational',
//       ru: 'Вдохновляющий',
//       ar: 'ملهم',
//       he: 'מעורר השראה',
//     },
//     {
//       en: 'Energetic',
//       ru: 'Энергичный',
//       ar: 'نشيط',
//       he: 'אנרגטי',
//     },
//     {
//       en: 'Enthusiastic',
//       ru: 'Энтузиастичный',
//       ar: 'متحمس',
//       he: 'נלהב',
//     },
//     {
//       en: 'Positive',
//       ru: 'Позитивный',
//       ar: 'إيجابي',
//       he: 'חיובי',
//     },
//     {
//       en: 'Optimistic',
//       ru: 'Оптимистичный',
//       ar: 'متفائل',
//       he: 'אופטימי',
//     },
//     {
//       en: 'Resilient',
//       ru: 'Устойчивый',
//       ar: 'مرن',
//       he: 'חסין',
//     },
//     { en: 'Stubborn', ru: 'Упрямый', ar: 'عنيد', he: 'עיקש' },
//     {
//       en: 'Shrewd',
//       ru: 'Проницательный',
//       ar: 'ذكي',
//       he: 'תושייתי',
//     },
//     { en: 'Precise', ru: 'Точный', ar: 'دقيق', he: 'דייקן' },
//     {
//       en: 'Pragmatic',
//       ru: 'Прагматичный',
//       ar: 'عملي',
//       he: 'פרגמטי',
//     },
//     {
//       en: 'Strategic',
//       ru: 'Стратегический',
//       ar: 'استراتيجي',
//       he: 'אסטרטגי',
//     },
//     {
//       en: 'Visionary',
//       ru: 'Визионер',
//       ar: 'ذو رؤية',
//       he: 'בעל חזון',
//     },
//     {
//       en: 'Intuitive',
//       ru: 'Интуитивный',
//       ar: 'حدسي',
//       he: 'אינטואיטיבי',
//     },
//     {
//       en: 'Meticulous',
//       ru: 'Педантичный',
//       ar: 'دقيق',
//       he: 'קפדני',
//     },
//     {
//       en: 'Thorough',
//       ru: 'Тщательный',
//       ar: 'شامل',
//       he: 'יסודי',
//     },
//     { en: 'Accurate', ru: 'Точный', ar: 'دقيق', he: 'מדויק' },
//     {
//       en: 'Methodical',
//       ru: 'Методичный',
//       ar: 'منهجي',
//       he: 'שיטתי',
//     },
//     {
//       en: 'Disciplined',
//       ru: 'Дисциплинированный',
//       ar: 'منضبط',
//       he: 'משמעתי',
//     },
//     {
//       en: 'Calm under pressure',
//       ru: 'Спокойный под давлением',
//       ar: 'هادئ تحت الضغط',
//       he: 'רגוע תחת לחץ',
//     },
//     {
//       en: 'Trustworthy',
//       ru: 'Надежный',
//       ar: 'جدير بالثقة',
//       he: 'אמין',
//     },
//     {
//       en: 'Cool-headed',
//       ru: 'Хладнокровный',
//       ar: 'هادئ الطباع',
//       he: 'קר רוח',
//     },
//     {
//       en: 'Balanced',
//       ru: 'Сбалансированный',
//       ar: 'متوازن',
//       he: 'מאוזן',
//     },
//     {
//       en: 'Decisive',
//       ru: 'Решительный',
//       ar: 'حاسم',
//       he: 'החלטי',
//     },
//     {
//       en: 'Fair',
//       ru: 'Справедливый',
//       ar: 'عادل',
//       he: 'הוגן',
//     },
//     {
//       en: 'Accessible',
//       ru: 'Доступный',
//       ar: 'سهل الوصول',
//       he: 'נגיש',
//     },
//     {
//       en: 'Open-minded',
//       ru: 'Открытый',
//       ar: 'منفتح',
//       he: 'פתוח',
//     },
//     {
//       en: 'Respectful',
//       ru: 'Уважительный',
//       ar: 'محترم',
//       he: 'מכבד',
//     },
//     {
//       en: 'Skilled negotiator',
//       ru: 'Умелый переговорщик',
//       ar: 'مفاوض ماهر',
//       he: 'מנהל משא ומתן מיומן',
//     },
//     {
//       en: 'Tech-savvy',
//       ru: 'Технически грамотный',
//       ar: 'ملم بالتكنولوجيا',
//       he: 'בקיא בטכנולוגיה',
//     },
//     {
//       en: 'Safety-conscious',
//       ru: 'Осознающий безопасность',
//       ar: 'واعٍ للأمان',
//       he: 'מודע לבטיחות',
//     },
//     {
//       en: 'Diligent',
//       ru: 'Трудолюбивый',
//       ar: 'مجتهد',
//       he: 'חרוץ',
//     },
//     {
//       en: 'Quality-focused',
//       ru: 'Ориентированный на качество',
//       ar: 'مركز على الجودة',
//       he: 'ממוקד איכות',
//     },
//     {
//       en: 'Customer-oriented',
//       ru: 'Ориентированный на клиента',
//       ar: 'موجه نحو العميل',
//       he: 'מכוון לקוח',
//     },
//     {
//       en: 'Service-oriented',
//       ru: 'Ориентированный на обслуживание',
//       ar: 'موجه نحو الخدمة',
//       he: 'מוכוון שירות',
//     },
//     {
//       en: 'Financially knowledgeable',
//       ru: 'Финансово грамотный',
//       ar: 'ملم بالمالية',
//       he: 'בקיא בפיננסים',
//     },
//     {
//       en: 'Physically fit',
//       ru: 'Физически подготовленный',
//       ar: 'لائق بدنياً',
//       he: 'בכושר גופני',
//     },
//     {
//       en: 'Detail-oriented',
//       ru: 'Внимательный к деталям',
//       ar: 'مهتم بالتفاصيل',
//       he: 'מקפיד על פרטים',
//     },
//     {
//       en: 'Efficient',
//       ru: 'Эффективный',
//       ar: 'فعّال',
//       he: 'יעיל',
//     },
//     { en: 'Flexible', ru: 'Гибкий', ar: 'مرن', he: 'גמיש' },
//   ];
//   Strength.bulkCreate(arr);
// }, 3000);
