import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import VSLModal from '@/components/VSLModal';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedPressable from '@/components/AnimatedPressable';
import AuroraBackground from '@/components/AuroraBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVSL } from '@/contexts/VSLContext';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronRight,
  Shield,
  AlertTriangle,
  Rocket,
  Key,
  Globe,
  Target,
  Zap,
  CreditCard,
  CheckCircle,
  Lightbulb,
  BookOpen,
  Heart,
} from 'lucide-react-native';

// Section config: icon, accent color per section
const SECTIONS = [
  { icon: Globe, accent: '#3b82f6' },         // Bem-vindo
  { icon: AlertTriangle, accent: '#EF4444' },  // Armadilha
  { icon: AlertTriangle, accent: '#F59E0B' },  // Inimigo
  { icon: Rocket, accent: '#10B981' },          // Solução
  { icon: Key, accent: '#8B5CF6' },             // Autocustódia
  { icon: Globe, accent: '#F7931A' },            // Redes
  { icon: Target, accent: '#6366f1' },           // O que vai dominar
  { icon: Target, accent: '#EC4899' },           // Por que para você
  { icon: CreditCard, accent: '#06b6d4' },       // Cripto dia a dia
  { icon: CheckCircle, accent: '#10B981' },       // Feito para você
  { icon: Lightbulb, accent: '#F59E0B' },         // Por que aprender
];

function BulletItem({ title, description, accent, textColor, descColor, fonts }: { title: string; description: string; accent: string; textColor: string; descColor: string; fonts: any }) {
  return (
    <View style={s.bulletItem}>
      <View style={[s.bulletDot, { backgroundColor: accent }]} />
      <View style={s.bulletContent}>
        <Text style={[s.bulletTitle, { color: textColor, fontFamily: fonts.bodySemiBold }]}>{title}</Text>
        <Text style={[s.bulletDesc, { color: descColor, fontFamily: fonts.body }]}>{description}</Text>
      </View>
    </View>
  );
}

function SectionCard({ index, title, accent, icon: Icon, colors, fonts, children }: any) {
  return (
    <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={s.cardHeader}>
        <View style={[s.cardNumberBadge, { backgroundColor: accent + '20' }]}>
          <Icon size={18} color={accent} />
        </View>
        <Text style={[s.cardTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{title}</Text>
      </View>
      <View style={[s.cardDivider, { backgroundColor: accent + '30' }]} />
      {children}
    </View>
  );
}

export default function AboutScreen() {
  const router = useRouter();
  const { colors, fonts } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const {
    shouldShowVSL,
    showVSLModal,
    hideVSLModal,
    isVSLModalVisible,
  } = useVSL();

  useEffect(() => {
    if (shouldShowVSL) {
      const timer = setTimeout(() => showVSLModal(), 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldShowVSL]);

  const sec = SECTIONS;

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <AuroraBackground />
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <View style={{ height: insets.top }} />
        <Image
          source={require('../../assets/images/hero-banner.png')}
          style={s.heroBanner}
          resizeMode="contain"
        />
        <View style={s.heroTextBox}>
          <Text style={[s.heroText, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.heroText')}
          </Text>
          <Text style={[s.heroHighlight, { fontFamily: fonts.bodyBold }]}>
            {t('home.heroHighlight')}
          </Text>
        </View>

        <View style={s.content}>

          {/* 1. BEM-VINDO */}
          <AnimatedSection>
            <SectionCard index={0} title={t('home.welcomeTitle')} accent={sec[0].accent} icon={sec[0].icon} colors={colors} fonts={fonts}>
              <Text style={[s.subtitle, { color: '#6366f1', fontFamily: fonts.bodySemiBold }]}>
                {t('home.welcomeSubtitle')}
              </Text>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.welcomeParagraph1')}</Text>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.welcomeParagraph2')}</Text>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.welcomeParagraph3')}</Text>
              <Text style={[s.paragraph, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('home.welcomeParagraph4')}</Text>
            </SectionCard>
          </AnimatedSection>

          {/* 2. ARMADILHA */}
          <AnimatedSection>
            <SectionCard index={1} title={t('home.trapTitle')} accent={sec[1].accent} icon={sec[1].icon} colors={colors} fonts={fonts}>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.trapIntro')}</Text>
              <BulletItem title={t('home.trapBullet1Title')} description={t('home.trapBullet1Desc')} accent={sec[1].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.trapBullet2Title')} description={t('home.trapBullet2Desc')} accent={sec[1].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.trapBullet3Title')} description={t('home.trapBullet3Desc')} accent={sec[1].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.trapBullet4Title')} description={t('home.trapBullet4Desc')} accent={sec[1].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.trapBullet5Title')} description={t('home.trapBullet5Desc')} accent={sec[1].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.trapBullet6Title')} description={t('home.trapBullet6Desc')} accent={sec[1].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            </SectionCard>
          </AnimatedSection>

          {/* 3. INIMIGO */}
          <AnimatedSection>
            <SectionCard index={2} title={t('home.enemyTitle')} accent={sec[2].accent} icon={sec[2].icon} colors={colors} fonts={fonts}>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.enemyParagraph1')}</Text>
              <Text style={[s.paragraph, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('home.enemyParagraph2')}</Text>
            </SectionCard>
          </AnimatedSection>

          {/* 4. SOLUÇÃO */}
          <AnimatedSection>
            <SectionCard index={3} title={t('home.solutionTitle')} accent={sec[3].accent} icon={sec[3].icon} colors={colors} fonts={fonts}>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.solutionIntro')}</Text>
              <BulletItem title={t('home.solutionBullet1Title')} description={t('home.solutionBullet1Desc')} accent={sec[3].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.solutionBullet2Title')} description={t('home.solutionBullet2Desc')} accent={sec[3].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.solutionBullet3Title')} description={t('home.solutionBullet3Desc')} accent={sec[3].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.solutionBullet4Title')} description={t('home.solutionBullet4Desc')} accent={sec[3].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.solutionBullet5Title')} description={t('home.solutionBullet5Desc')} accent={sec[3].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.solutionBullet6Title')} description={t('home.solutionBullet6Desc')} accent={sec[3].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            </SectionCard>
          </AnimatedSection>

          {/* 5. AUTOCUSTÓDIA */}
          <AnimatedSection>
            <SectionCard index={4} title={t('home.custodyTitle')} accent={sec[4].accent} icon={sec[4].icon} colors={colors} fonts={fonts}>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.custodyParagraph1')}</Text>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.custodyParagraph2')}</Text>
              <Text style={[s.highlightText, { color: colors.text, fontFamily: fonts.bodyBold }]}>{t('home.custodyHighlight')}</Text>
              <View style={s.noNeedRow}>
                <View style={[s.noNeedChip, { borderColor: '#EF444440' }]}>
                  <Text style={[s.noNeedText, { fontFamily: fonts.bodySemiBold }]}>{t('home.custodyNoNeed1')}</Text>
                </View>
                <View style={[s.noNeedChip, { borderColor: '#EF444440' }]}>
                  <Text style={[s.noNeedText, { fontFamily: fonts.bodySemiBold }]}>{t('home.custodyNoNeed2')}</Text>
                </View>
                <View style={[s.noNeedChip, { borderColor: '#EF444440' }]}>
                  <Text style={[s.noNeedText, { fontFamily: fonts.bodySemiBold }]}>{t('home.custodyNoNeed3')}</Text>
                </View>
                <View style={[s.noNeedChip, { borderColor: '#EF444440' }]}>
                  <Text style={[s.noNeedText, { fontFamily: fonts.bodySemiBold }]}>{t('home.custodyNoNeed4')}</Text>
                </View>
              </View>
            </SectionCard>
          </AnimatedSection>

          {/* 6. REDES */}
          <AnimatedSection>
            <SectionCard index={5} title={t('home.networksTitle')} accent={sec[5].accent} icon={sec[5].icon} colors={colors} fonts={fonts}>
              <View style={[s.networkItem, { borderColor: '#F7931A30' }]}>
                <View style={[s.networkDot, { backgroundColor: '#F7931A' }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[s.networkTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.networkBitcoinTitle')}</Text>
                  <Text style={[s.networkDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('home.networkBitcoinDesc')}</Text>
                </View>
              </View>
              <View style={[s.networkItem, { borderColor: '#3b82f630' }]}>
                <View style={[s.networkDot, { backgroundColor: '#3b82f6' }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[s.networkTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.networkEthereumTitle')}</Text>
                  <Text style={[s.networkDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('home.networkEthereumDesc')}</Text>
                </View>
              </View>
            </SectionCard>
          </AnimatedSection>

          {/* 7. O QUE VAI DOMINAR */}
          <AnimatedSection>
            <SectionCard index={6} title={t('home.masterTitle')} accent={sec[6].accent} icon={sec[6].icon} colors={colors} fonts={fonts}>
              <BulletItem title={t('home.masterBullet1Title')} description={t('home.masterBullet1Desc')} accent={sec[6].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.masterBullet2Title')} description={t('home.masterBullet2Desc')} accent={sec[6].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.masterBullet3Title')} description={t('home.masterBullet3Desc')} accent={sec[6].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.masterBullet4Title')} description={t('home.masterBullet4Desc')} accent={sec[6].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.masterBullet5Title')} description={t('home.masterBullet5Desc')} accent={sec[6].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.masterBullet6Title')} description={t('home.masterBullet6Desc')} accent={sec[6].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.masterBullet7Title')} description={t('home.masterBullet7Desc')} accent={sec[6].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            </SectionCard>
          </AnimatedSection>

          {/* 8. POR QUE PARA VOCÊ */}
          <AnimatedSection>
            <SectionCard index={7} title={t('home.whyForYouTitle')} accent={sec[7].accent} icon={sec[7].icon} colors={colors} fonts={fonts}>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.whyForYouIntro')}</Text>
              <BulletItem title={t('home.whyForYouBullet1Title')} description={t('home.whyForYouBullet1Desc')} accent={sec[7].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.whyForYouBullet2Title')} description={t('home.whyForYouBullet2Desc')} accent={sec[7].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.whyForYouBullet3Title')} description={t('home.whyForYouBullet3Desc')} accent={sec[7].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.whyForYouBullet4Title')} description={t('home.whyForYouBullet4Desc')} accent={sec[7].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.whyForYouBullet5Title')} description={t('home.whyForYouBullet5Desc')} accent={sec[7].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.whyForYouBullet6Title')} description={t('home.whyForYouBullet6Desc')} accent={sec[7].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            </SectionCard>
          </AnimatedSection>

          {/* 9. CRIPTO DIA A DIA */}
          <AnimatedSection>
            <SectionCard index={8} title={t('home.cryptoDailyTitle')} accent={sec[8].accent} icon={sec[8].icon} colors={colors} fonts={fonts}>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.cryptoDailyIntro')}</Text>
              <BulletItem title={t('home.cryptoDailyBullet1Title')} description={t('home.cryptoDailyBullet1Desc')} accent={sec[8].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.cryptoDailyBullet2Title')} description={t('home.cryptoDailyBullet2Desc')} accent={sec[8].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.cryptoDailyBullet3Title')} description={t('home.cryptoDailyBullet3Desc')} accent={sec[8].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.cryptoDailyBullet4Title')} description={t('home.cryptoDailyBullet4Desc')} accent={sec[8].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.cryptoDailyBullet5Title')} description={t('home.cryptoDailyBullet5Desc')} accent={sec[8].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            </SectionCard>
          </AnimatedSection>

          {/* 10. FEITO PARA VOCÊ */}
          <AnimatedSection>
            <SectionCard index={9} title={t('home.madeForYouTitle')} accent={sec[9].accent} icon={sec[9].icon} colors={colors} fonts={fonts}>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.madeForYouIntro')}</Text>
              <BulletItem title={t('home.madeForYouBullet1Title')} description={t('home.madeForYouBullet1Desc')} accent={sec[9].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.madeForYouBullet2Title')} description={t('home.madeForYouBullet2Desc')} accent={sec[9].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.madeForYouBullet3Title')} description={t('home.madeForYouBullet3Desc')} accent={sec[9].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.madeForYouBullet4Title')} description={t('home.madeForYouBullet4Desc')} accent={sec[9].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            </SectionCard>
          </AnimatedSection>

          {/* 11. POR QUE APRENDER COMIGO */}
          <AnimatedSection>
            <SectionCard index={10} title={t('home.whyLearnTitle')} accent={sec[10].accent} icon={sec[10].icon} colors={colors} fonts={fonts}>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.whyLearnIntro')}</Text>
              <BulletItem title={t('home.whyLearnBullet1Title')} description={t('home.whyLearnBullet1Desc')} accent={sec[10].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.whyLearnBullet2Title')} description={t('home.whyLearnBullet2Desc')} accent={sec[10].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <BulletItem title={t('home.whyLearnBullet3Title')} description={t('home.whyLearnBullet3Desc')} accent={sec[10].accent} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
              <Text style={[s.paragraph, { color: colors.textSecondary, fontFamily: fonts.body, marginTop: 8 }]}>{t('home.whyLearnClosing')}</Text>
            </SectionCard>
          </AnimatedSection>

          {/* NOSSOS TREINAMENTOS */}
          <AnimatedSection>
            <View style={s.trainingsHeader}>
              <View style={[s.cardNumberBadge, { backgroundColor: '#6366f120' }]}>
                <BookOpen size={18} color="#6366f1" />
              </View>
              <Text style={[s.trainingsTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.trainingsTitle')}</Text>
            </View>

            {/* Trilha 1 */}
            <View style={[s.trailCard, { borderColor: '#F7931A40' }]}>
              <LinearGradient colors={['#F7931A', '#E2761B'] as const} style={s.trailCardHeader}>
                <Text style={[s.trailLabel, { fontFamily: fonts.secondaryMedium }]}>{t('home.trail1Label')}</Text>
                <Text style={[s.trailTitle, { fontFamily: fonts.display }]}>{t('home.trail1Title')}</Text>
                <Text style={[s.trailSub, { fontFamily: fonts.body }]}>{t('home.trail1Subtitle')}</Text>
              </LinearGradient>
              <View style={s.trailBody}>
                <TrailCourseItem title={t('home.course1Title')} subtitle={t('home.course1Subtitle')} price="397,00" image={require('../../assets/images/curso-bitcoin.png')} onPress={() => router.push('/course/1')} colors={colors} fonts={fonts} />
                <TrailCourseItem title={t('home.course2Title')} subtitle={t('home.course2Subtitle')} price="397,00" image={require('../../assets/images/curso-ethereum.png')} onPress={() => router.push('/course/2')} colors={colors} fonts={fonts} />
              </View>
            </View>

            {/* Trilha 2 */}
            <View style={[s.trailCard, { borderColor: '#3B82F640' }]}>
              <LinearGradient colors={['#3B82F6', '#1D4ED8'] as const} style={s.trailCardHeader}>
                <Text style={[s.trailLabel, { fontFamily: fonts.secondaryMedium }]}>{t('home.trail2Label')}</Text>
                <Text style={[s.trailTitle, { fontFamily: fonts.display }]}>{t('home.trail2Title')}</Text>
                <Text style={[s.trailSub, { fontFamily: fonts.body }]}>{t('home.trail2Subtitle')}</Text>
              </LinearGradient>
              <View style={s.trailBody}>
                <TrailCourseItem title={t('home.course3Title')} subtitle={t('home.course3Subtitle')} price="397,00" image={require('../../assets/images/curso-autocustodia.png')} onPress={() => router.push('/course/3')} colors={colors} fonts={fonts} />
              </View>
            </View>

            {/* Garantia */}
            <View style={s.guaranteeCard}>
              <LinearGradient colors={['rgba(16,185,129,0.1)', 'transparent'] as const} style={StyleSheet.absoluteFill} />
              <View style={[s.guaranteeIconCircle, { backgroundColor: '#10B98120' }]}>
                <Shield size={24} color="#10B981" />
              </View>
              <Text style={[s.guaranteeTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.guaranteeTitle')}</Text>
              <View style={[s.accentLine, { backgroundColor: '#10B981' }]} />
              <Text style={[s.guaranteeDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('home.guaranteeDesc')}</Text>
            </View>
          </AnimatedSection>

          {/* MANIFESTO */}
          <AnimatedSection>
            <View style={s.manifestoCard}>
              <LinearGradient colors={['rgba(99,102,241,0.08)', 'rgba(15,23,42,0.95)'] as const} style={StyleSheet.absoluteFill} />
              <Text style={[s.manifestoTitle, { fontFamily: fonts.display }]}>{t('home.manifestoTitle')}</Text>
              <View style={[s.accentLine, { backgroundColor: '#F7931A' }]} />
              <Text style={[s.manifestoText, { fontFamily: fonts.body }]}>{t('home.manifestoParagraph1')}</Text>
              <Text style={[s.manifestoText, { fontFamily: fonts.body }]}>{t('home.manifestoParagraph2')}</Text>
              <Text style={[s.manifestoText, { fontFamily: fonts.body }]}>{t('home.manifestoParagraph3')}</Text>
              <Text style={[s.manifestoHighlight, { fontFamily: fonts.bodyBold }]}>{t('home.manifestoHighlight')}</Text>
            </View>
          </AnimatedSection>

          {/* QUEM SOU EU */}
          <AnimatedSection>
            <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={s.cardHeader}>
                <View style={[s.cardNumberBadge, { backgroundColor: '#EC489920' }]}>
                  <Heart size={18} color="#EC4899" />
                </View>
                <Text style={[s.cardTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.aboutMeTitle')}</Text>
              </View>
              <View style={[s.cardDivider, { backgroundColor: '#EC489930' }]} />

              <View style={s.profileImageContainer}>
                <Image source={require('../../assets/images/dani-profile.png')} style={s.profileImage} resizeMode="cover" />
              </View>
              <Text style={[s.profileName, { color: colors.text, fontFamily: fonts.display }]}>{t('home.aboutMeName')}</Text>
              <Text style={[s.profileRole, { fontFamily: fonts.bodySemiBold }]}>{t('home.aboutMeRole')}</Text>

              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.aboutMeParagraph1')}</Text>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.aboutMeParagraph2')}</Text>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.aboutMeParagraph3')}</Text>
              <Text style={[s.paragraph, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('home.aboutMeTools')}</Text>
              <Text style={[s.paragraph, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('home.aboutMeToolsClosing')}</Text>

              <View style={[s.cardDivider, { backgroundColor: '#EC489920', marginTop: 8 }]} />
              <Text style={[s.subTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.aboutMeMissionTitle')}</Text>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.aboutMeMissionText')}</Text>

              <Text style={[s.subTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.aboutMeWhyTitle')}</Text>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.aboutMeWhyText')}</Text>
            </View>
          </AnimatedSection>

          {/* FAMÍLIA */}
          <AnimatedSection>
            <View style={[s.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={s.cardHeader}>
                <View style={[s.cardNumberBadge, { backgroundColor: '#F59E0B20' }]}>
                  <Heart size={18} color="#F59E0B" />
                </View>
                <Text style={[s.cardTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.familyTitle')}</Text>
              </View>
              <View style={[s.cardDivider, { backgroundColor: '#F59E0B30' }]} />
              <View style={s.familyImageContainer}>
                <Image source={require('../../assets/images/dani-family.png')} style={s.familyImage} resizeMode="cover" />
              </View>
              <Text style={[s.paragraph, { color: colors.text, fontFamily: fonts.body }]}>{t('home.familyParagraph1')}</Text>
              <Text style={[s.paragraph, { color: colors.textSecondary, fontFamily: fonts.body }]}>{t('home.familyParagraph2')}</Text>
            </View>
          </AnimatedSection>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      <VSLModal
        visible={isVSLModalVisible}
        onClose={hideVSLModal}
        onCTAPress={() => {
          hideVSLModal();
          router.push('/auth/register');
        }}
      />
    </View>
  );
}

function TrailCourseItem({ title, subtitle, price, image, onPress, colors, fonts }: any) {
  return (
    <AnimatedPressable onPress={onPress} style={s.courseItem}>
      <Image source={image} style={s.courseImage} resizeMode="cover" />
      <View style={s.courseInfo}>
        <Text style={[s.courseName, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{title}</Text>
        <Text style={[s.courseSub, { color: colors.textSecondary, fontFamily: fonts.body }]} numberOfLines={2}>{subtitle}</Text>
        <View style={s.courseFooter}>
          <Text style={[s.coursePrice, { fontFamily: fonts.bodyBold }]}>R$ {price}</Text>
          <ChevronRight size={16} color="#6366f1" />
        </View>
      </View>
    </AnimatedPressable>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  // Hero
  heroBanner: { width: '100%', height: undefined, aspectRatio: 1402 / 935 },
  heroTextBox: { paddingHorizontal: 20, paddingVertical: 16 },
  heroText: { fontSize: 15, lineHeight: 22, marginBottom: 8 },
  heroHighlight: { color: '#F7931A', fontSize: 15, lineHeight: 22 },

  content: { padding: 16 },

  // Section card
  card: { borderRadius: 16, borderWidth: 1, padding: 20, marginBottom: 14 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  cardNumberBadge: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 17, flex: 1 },
  cardDivider: { height: 1, marginBottom: 14 },

  // Bullets
  bulletItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
  bulletContent: { flex: 1 },
  bulletTitle: { fontSize: 15, marginBottom: 2 },
  bulletDesc: { fontSize: 13, lineHeight: 20 },

  // Text
  subtitle: { fontSize: 15, marginBottom: 12 },
  paragraph: { fontSize: 14, lineHeight: 22, marginBottom: 10 },
  highlightText: { fontSize: 15, fontStyle: 'italic', lineHeight: 24, marginBottom: 12 },
  subTitle: { fontSize: 16, marginTop: 12, marginBottom: 8 },

  // Custody chips
  noNeedRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  noNeedChip: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  noNeedText: { fontSize: 13, color: '#EF4444' },

  // Networks
  networkItem: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 10, flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  networkDot: { width: 10, height: 10, borderRadius: 5, marginTop: 6 },
  networkTitle: { fontSize: 16, marginBottom: 4 },
  networkDesc: { fontSize: 13, lineHeight: 20 },

  // Accent line
  accentLine: { width: 40, height: 3, borderRadius: 2, marginBottom: 12 },

  // Trainings
  trainingsHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  trainingsTitle: { fontSize: 20 },

  // Trail cards
  trailCard: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
  trailCardHeader: { padding: 20, paddingBottom: 16 },
  trailLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  trailTitle: { color: '#FFF', fontSize: 20, marginBottom: 4 },
  trailSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  trailBody: { padding: 16, paddingTop: 12 },

  // Course items in trail
  courseItem: { flexDirection: 'row', marginBottom: 14, gap: 12 },
  courseImage: { width: 80, height: 54, borderRadius: 10 },
  courseInfo: { flex: 1 },
  courseName: { fontSize: 14, marginBottom: 2 },
  courseSub: { fontSize: 12, lineHeight: 18, marginBottom: 6 },
  courseFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  coursePrice: { fontSize: 15, color: '#10B981' },

  // Guarantee
  guaranteeCard: {
    borderRadius: 20, borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)',
    padding: 24, marginBottom: 14, alignItems: 'center', overflow: 'hidden',
  },
  guaranteeIconCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  guaranteeTitle: { fontSize: 18, marginBottom: 8 },
  guaranteeDesc: { fontSize: 14, textAlign: 'center', lineHeight: 22 },

  // Manifesto
  manifestoCard: {
    borderRadius: 20, padding: 24, marginBottom: 14, overflow: 'hidden',
    backgroundColor: '#0f172a', borderWidth: 1, borderColor: 'rgba(99,102,241,0.2)',
  },
  manifestoTitle: { color: '#F7931A', fontSize: 22, marginBottom: 12, lineHeight: 30 },
  manifestoText: { color: '#d1d5db', fontSize: 14, lineHeight: 24, marginBottom: 10 },
  manifestoHighlight: { color: '#6366f1', fontSize: 15, lineHeight: 24, marginTop: 4 },

  // Profile
  profileImageContainer: { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
  profileImage: { width: '100%', height: 420 },
  profileName: { fontSize: 22, marginBottom: 4 },
  profileRole: { fontSize: 13, color: '#6366f1', marginBottom: 14 },

  // Family
  familyImageContainer: { borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
  familyImage: { width: '100%', height: 380 },

});
