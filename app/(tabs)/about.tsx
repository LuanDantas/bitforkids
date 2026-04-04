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
import GlassCard from '@/components/GlassCard';
import AuroraBackground from '@/components/AuroraBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVSL } from '@/contexts/VSLContext';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronRight,
  Settings,
  LogOut,
} from 'lucide-react-native';

function SectionTitle({ emoji, title, color, fonts }: { emoji: string; title: string; color: string; fonts: any }) {
  return (
    <View style={sectionStyles.titleRow}>
      <Text style={sectionStyles.emoji}>{emoji}</Text>
      <Text style={[sectionStyles.title, { color, fontFamily: fonts.display }]}>{title}</Text>
    </View>
  );
}

function BulletItem({ emoji, title, description, textColor, descColor, fonts }: { emoji: string; title: string; description: string; textColor: string; descColor: string; fonts: any }) {
  return (
    <View style={sectionStyles.bulletItem}>
      <Text style={sectionStyles.bulletEmoji}>{emoji}</Text>
      <View style={sectionStyles.bulletContent}>
        <Text style={[sectionStyles.bulletTitle, { color: textColor, fontFamily: fonts.bodyBold }]}>{title}</Text>
        <Text style={[sectionStyles.bulletDesc, { color: descColor, fontFamily: fonts.body }]}>{description}</Text>
      </View>
    </View>
  );
}

function CourseTrailCard({ id, title, subtitle, price, image, onPress, colors, fonts }: any) {
  return (
    <AnimatedPressable onPress={onPress} style={sectionStyles.courseCard}>
      <GlassCard style={sectionStyles.courseCardGlass}>
        <View style={{ margin: -16 }}>
          <Image source={image} style={sectionStyles.courseImage} resizeMode="cover" />
          <View style={sectionStyles.courseInfo}>
            <Text style={[sectionStyles.courseTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{title}</Text>
            <Text style={[sectionStyles.courseSubtitle, { color: colors.textSecondary, fontFamily: fonts.body }]} numberOfLines={2}>{subtitle}</Text>
            <View style={sectionStyles.courseFooter}>
              <Text style={[sectionStyles.coursePrice, { fontFamily: fonts.bodyBold }]}>R$ {price}</Text>
              <ChevronRight size={18} color="#6366f1" />
            </View>
          </View>
        </View>
      </GlassCard>
    </AnimatedPressable>
  );
}

const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  android: {
    elevation: 6,
  },
  default: {},
}) as any;

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AuroraBackground />
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <View style={{ height: insets.top }} />
        <Image
          source={require('../../assets/images/hero-banner.png')}
          style={styles.heroBanner}
          resizeMode="contain"
        />
        <View style={styles.heroTextBox}>
          <Text style={[styles.heroText, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.heroText')}
          </Text>
          <Text style={[styles.heroHighlight, { fontFamily: fonts.bodyBold }]}>
            {t('home.heroHighlight')}
          </Text>
        </View>

        <View style={styles.content}>

          {/* BEM-VINDO */}
          <AnimatedSection>
            <SectionTitle emoji="🌐" title={t('home.welcomeTitle')} color={colors.text} fonts={fonts} />
            <Text style={[styles.sectionSubtitle, { color: '#6366f1', fontFamily: fonts.bodySemiBold }]}>
              {t('home.welcomeSubtitle')}
            </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.welcomeParagraph1')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.welcomeParagraph2')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.welcomeParagraph3')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.welcomeParagraph4')}
          </Text>
          </AnimatedSection>

          <View style={styles.divider} />
          <AnimatedSection>

          {/* ARMADILHA */}
          <SectionTitle emoji="🌍" title={t('home.trapTitle')} color={colors.text} fonts={fonts} />
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.trapIntro')}
          </Text>
          <GlassCard style={styles.sectionCard}>
            <BulletItem emoji="📋" title={t('home.trapBullet1Title')} description={t('home.trapBullet1Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="📉" title={t('home.trapBullet2Title')} description={t('home.trapBullet2Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🔒" title={t('home.trapBullet3Title')} description={t('home.trapBullet3Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="👁️" title={t('home.trapBullet4Title')} description={t('home.trapBullet4Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🏦" title={t('home.trapBullet5Title')} description={t('home.trapBullet5Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="⚖️" title={t('home.trapBullet6Title')} description={t('home.trapBullet6Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
          </GlassCard>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* INIMIGO */}
          <SectionTitle emoji="🛑" title={t('home.enemyTitle')} color={colors.text} fonts={fonts} />
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.enemyParagraph1')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.enemyParagraph2')}
          </Text>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* SOLUÇÃO */}
          <SectionTitle emoji="🚀" title={t('home.solutionTitle')} color={colors.text} fonts={fonts} />
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.solutionIntro')}
          </Text>
          <GlassCard style={styles.sectionCard}>
            <BulletItem emoji="🛡️" title={t('home.solutionBullet1Title')} description={t('home.solutionBullet1Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="📊" title={t('home.solutionBullet2Title')} description={t('home.solutionBullet2Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="💵" title={t('home.solutionBullet3Title')} description={t('home.solutionBullet3Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🔓" title={t('home.solutionBullet4Title')} description={t('home.solutionBullet4Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🚫" title={t('home.solutionBullet5Title')} description={t('home.solutionBullet5Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🌍" title={t('home.solutionBullet6Title')} description={t('home.solutionBullet6Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
          </GlassCard>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* AUTOCUSTÓDIA */}
          <SectionTitle emoji="🔐" title={t('home.custodyTitle')} color={colors.text} fonts={fonts} />
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.custodyParagraph1')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.custodyParagraph2')}
          </Text>
          <Text style={[styles.highlightText, { color: colors.text, fontFamily: fonts.bodyBold }]}>
            {t('home.custodyHighlight')}
          </Text>
          <View style={styles.noNeedRow}>
            <Text style={[styles.noNeedItem, { fontFamily: fonts.bodySemiBold }]}>❌ {t('home.custodyNoNeed1')}</Text>
            <Text style={[styles.noNeedItem, { fontFamily: fonts.bodySemiBold }]}>❌ {t('home.custodyNoNeed2')}</Text>
            <Text style={[styles.noNeedItem, { fontFamily: fonts.bodySemiBold }]}>❌ {t('home.custodyNoNeed3')}</Text>
            <Text style={[styles.noNeedItem, { fontFamily: fonts.bodySemiBold }]}>❌ {t('home.custodyNoNeed4')}</Text>
          </View>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* REDES DA NOVA ECONOMIA */}
          <SectionTitle emoji="🟠" title={t('home.networksTitle')} color={colors.text} fonts={fonts} />
          <GlassCard style={styles.networkCard}>
            <Text style={styles.networkEmoji}>🟠</Text>
            <Text style={[styles.networkTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.networkBitcoinTitle')}</Text>
            <Text style={[styles.networkDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>
              {t('home.networkBitcoinDesc')}
            </Text>
          </GlassCard>
          <GlassCard style={styles.networkCard}>
            <Text style={styles.networkEmoji}>🔵</Text>
            <Text style={[styles.networkTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.networkEthereumTitle')}</Text>
            <Text style={[styles.networkDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>
              {t('home.networkEthereumDesc')}
            </Text>
          </GlassCard>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* O QUE VAI DOMINAR */}
          <SectionTitle emoji="🎯" title={t('home.masterTitle')} color={colors.text} fonts={fonts} />
          <GlassCard style={styles.sectionCard}>
            <BulletItem emoji="🛡️" title={t('home.masterBullet1Title')} description={t('home.masterBullet1Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🟠" title={t('home.masterBullet2Title')} description={t('home.masterBullet2Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🌐" title={t('home.masterBullet3Title')} description={t('home.masterBullet3Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🌍" title={t('home.masterBullet4Title')} description={t('home.masterBullet4Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="💵" title={t('home.masterBullet5Title')} description={t('home.masterBullet5Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🔐" title={t('home.masterBullet6Title')} description={t('home.masterBullet6Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🚫" title={t('home.masterBullet7Title')} description={t('home.masterBullet7Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
          </GlassCard>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* POR QUE PARA VOCÊ */}
          <SectionTitle emoji="🎯" title={t('home.whyForYouTitle')} color={colors.text} fonts={fonts} />
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.whyForYouIntro')}
          </Text>
          <GlassCard style={styles.sectionCard}>
            <BulletItem emoji="🏦" title={t('home.whyForYouBullet1Title')} description={t('home.whyForYouBullet1Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🛡️" title={t('home.whyForYouBullet2Title')} description={t('home.whyForYouBullet2Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🔒" title={t('home.whyForYouBullet3Title')} description={t('home.whyForYouBullet3Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🔐" title={t('home.whyForYouBullet4Title')} description={t('home.whyForYouBullet4Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="📖" title={t('home.whyForYouBullet5Title')} description={t('home.whyForYouBullet5Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="⚠️" title={t('home.whyForYouBullet6Title')} description={t('home.whyForYouBullet6Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
          </GlassCard>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* CRIPTO NO DIA A DIA */}
          <SectionTitle emoji="💳" title={t('home.cryptoDailyTitle')} color={colors.text} fonts={fonts} />
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.cryptoDailyIntro')}
          </Text>
          <GlassCard style={styles.sectionCard}>
            <BulletItem emoji="💸" title={t('home.cryptoDailyBullet1Title')} description={t('home.cryptoDailyBullet1Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="💳" title={t('home.cryptoDailyBullet2Title')} description={t('home.cryptoDailyBullet2Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="📄" title={t('home.cryptoDailyBullet3Title')} description={t('home.cryptoDailyBullet3Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🌎" title={t('home.cryptoDailyBullet4Title')} description={t('home.cryptoDailyBullet4Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="📱" title={t('home.cryptoDailyBullet5Title')} description={t('home.cryptoDailyBullet5Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
          </GlassCard>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* FEITO PARA VOCÊ */}
          <SectionTitle emoji="✅" title={t('home.madeForYouTitle')} color={colors.text} fonts={fonts} />
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.madeForYouIntro')}
          </Text>
          <GlassCard style={styles.sectionCard}>
            <BulletItem emoji="👣" title={t('home.madeForYouBullet1Title')} description={t('home.madeForYouBullet1Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="💰" title={t('home.madeForYouBullet2Title')} description={t('home.madeForYouBullet2Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🚫" title={t('home.madeForYouBullet3Title')} description={t('home.madeForYouBullet3Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🔐" title={t('home.madeForYouBullet4Title')} description={t('home.madeForYouBullet4Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
          </GlassCard>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* POR QUE APRENDER COMIGO */}
          <SectionTitle emoji="💡" title={t('home.whyLearnTitle')} color={colors.text} fonts={fonts} />
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.whyLearnIntro')}
          </Text>
          <GlassCard style={styles.sectionCard}>
            <BulletItem emoji="💪" title={t('home.whyLearnBullet1Title')} description={t('home.whyLearnBullet1Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="🧠" title={t('home.whyLearnBullet2Title')} description={t('home.whyLearnBullet2Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
            <BulletItem emoji="📚" title={t('home.whyLearnBullet3Title')} description={t('home.whyLearnBullet3Desc')} textColor={colors.text} descColor={colors.textSecondary} fonts={fonts} />
          </GlassCard>
          <Text style={[styles.paragraph, { color: colors.text, marginTop: 12 }]}>
            {t('home.whyLearnClosing')}
          </Text>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* NOSSOS TREINAMENTOS */}
          <SectionTitle emoji="📚" title={t('home.trainingsTitle')} color={colors.text} fonts={fonts} />

          {/* Trilha 1 — Card Container */}
          <GlassCard style={styles.trailCard} borderRadius={20}>
            <View style={{ margin: -16 }}>
              <LinearGradient colors={['#F7931A', '#E2761B'] as const} style={styles.trailCardHeader}>
                <Text style={[styles.trailCardHeaderText, { fontFamily: fonts.secondaryMedium }]}>🟠 {t('home.trail1Label')}</Text>
                <Text style={[styles.trailCardHeaderTitle, { fontFamily: fonts.display }]}>{t('home.trail1Title')}</Text>
                <Text style={[styles.trailCardHeaderSub, { fontFamily: fonts.body }]}>{t('home.trail1Subtitle')}</Text>
              </LinearGradient>
              <View style={styles.trailCardBody}>
                <CourseTrailCard
                  id={1}
                  title={t('home.course1Title')}
                  subtitle={t('home.course1Subtitle')}
                  price="397,00"
                  image={require('../../assets/images/curso-bitcoin.png')}
                  onPress={() => router.push('/course/1')}
                  colors={colors}
                  fonts={fonts}
                />
                <CourseTrailCard
                  id={2}
                  title={t('home.course2Title')}
                  subtitle={t('home.course2Subtitle')}
                  price="397,00"
                  image={require('../../assets/images/curso-ethereum.png')}
                  onPress={() => router.push('/course/2')}
                  colors={colors}
                  fonts={fonts}
                />
              </View>
            </View>
          </GlassCard>

          {/* Trilha 2 — Card Container */}
          <View style={{ marginTop: 20 }}>
          <GlassCard style={styles.trailCard} borderRadius={20}>
            <View style={{ margin: -16 }}>
              <LinearGradient colors={['#3B82F6', '#1D4ED8'] as const} style={styles.trailCardHeader}>
                <Text style={[styles.trailCardHeaderText, { fontFamily: fonts.secondaryMedium }]}>🔵 {t('home.trail2Label')}</Text>
                <Text style={[styles.trailCardHeaderTitle, { fontFamily: fonts.display }]}>{t('home.trail2Title')}</Text>
                <Text style={[styles.trailCardHeaderSub, { fontFamily: fonts.body }]}>{t('home.trail2Subtitle')}</Text>
              </LinearGradient>
              <View style={styles.trailCardBody}>
                <CourseTrailCard
                  id={3}
                  title={t('home.course3Title')}
                  subtitle={t('home.course3Subtitle')}
                  price="397,00"
                  image={require('../../assets/images/curso-autocustodia.png')}
                  onPress={() => router.push('/course/3')}
                  colors={colors}
                  fonts={fonts}
                />
              </View>
            </View>
          </GlassCard>
          </View>

          {/* Garantia */}
          <GlassCard style={styles.guaranteeCard}>
            <Text style={styles.guaranteeEmoji}>✅</Text>
            <Text style={[styles.guaranteeTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>{t('home.guaranteeTitle')}</Text>
            <Text style={[styles.guaranteeDesc, { color: colors.textSecondary, fontFamily: fonts.body }]}>
              {t('home.guaranteeDesc')}
            </Text>
          </GlassCard>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* MANIFESTO */}
          <View style={[styles.manifestoCard, { backgroundColor: '#0f172a' }]}>
            <Text style={[styles.manifestoTitle, { fontFamily: fonts.display }]}>
              {t('home.manifestoTitle')}
            </Text>
            <Text style={[styles.manifestoText, { fontFamily: fonts.body }]}>
              {t('home.manifestoParagraph1')}
            </Text>
            <Text style={[styles.manifestoText, { fontFamily: fonts.body }]}>
              {t('home.manifestoParagraph2')}
            </Text>
            <Text style={[styles.manifestoText, { fontFamily: fonts.body }]}>
              {t('home.manifestoParagraph3')}
            </Text>
            <Text style={[styles.manifestoHighlight, { fontFamily: fonts.bodyBold }]}>
              {t('home.manifestoHighlight')}
            </Text>
          </View>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* QUEM SOU EU */}
          <SectionTitle emoji="👩‍💼" title={t('home.aboutMeTitle')} color={colors.text} fonts={fonts} />
          <GlassCard style={styles.profileCard} borderRadius={20}>
            <View style={{ margin: -16 }}>
              <Image
                source={require('../../assets/images/dani-profile.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={[styles.profileName, { color: colors.text, fontFamily: fonts.display }]}>{t('home.aboutMeName')}</Text>
              <Text style={[styles.profileRole, { color: '#6366f1', fontFamily: fonts.bodySemiBold }]}>{t('home.aboutMeRole')}</Text>
            </View>
          </GlassCard>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.aboutMeParagraph1')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.aboutMeParagraph2')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.aboutMeParagraph3')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.aboutMeTools')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.aboutMeToolsClosing')}
          </Text>

          <Text style={[styles.subSectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>🎯 {t('home.aboutMeMissionTitle')}</Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.aboutMeMissionText')}
          </Text>

          <Text style={[styles.subSectionTitle, { color: colors.text, fontFamily: fonts.displaySemiBold }]}>🚀 {t('home.aboutMeWhyTitle')}</Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.aboutMeWhyText')}
          </Text>

          </AnimatedSection>
          <View style={styles.divider} />
          <AnimatedSection>

          {/* FAMÍLIA */}
          <SectionTitle emoji="👨‍👩‍👧" title={t('home.familyTitle')} color={colors.text} fonts={fonts} />
          <GlassCard style={styles.familyCard} borderRadius={20}>
            <View style={{ margin: -16 }}>
              <Image
                source={require('../../assets/images/dani-family.png')}
                style={styles.familyImage}
                resizeMode="cover"
              />
            </View>
          </GlassCard>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.familyParagraph1')}
          </Text>
          <Text style={[styles.paragraph, { color: colors.text, fontFamily: fonts.body }]}>
            {t('home.familyParagraph2')}
          </Text>

          {/* AÇÕES RÁPIDAS */}
          </AnimatedSection>
          <View style={styles.divider} />
          <View style={styles.quickActions}>
            <AnimatedPressable
              style={[styles.quickActionBtn, { backgroundColor: colors.card }, shadowStyle]}
              onPress={() => router.push('/settings')}
            >
              <Settings size={20} color="#6366f1" />
              <Text style={[styles.quickActionText, { color: colors.text, fontFamily: fonts.bodySemiBold }]}>{t('home.quickSettings')}</Text>
            </AnimatedPressable>
            <AnimatedPressable
              style={[styles.quickActionBtn, { backgroundColor: colors.card }, shadowStyle]}
              onPress={() => router.replace('/auth/login')}
            >
              <LogOut size={20} color="#EF4444" />
              <Text style={[styles.quickActionText, { color: '#EF4444', fontFamily: fonts.bodySemiBold }]}>{t('home.quickLogout')}</Text>
            </AnimatedPressable>
          </View>

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

const sectionStyles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    flex: 1,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 4,
  },
  bulletEmoji: {
    fontSize: 18,
    marginRight: 10,
    marginTop: 2,
  },
  bulletContent: {
    flex: 1,
  },
  bulletTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  bulletDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  courseCard: {
    marginBottom: 16,
  },
  courseCardGlass: {
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 17,
    marginBottom: 4,
  },
  courseSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    fontSize: 18,
    color: '#10B981',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionCard: {
    marginBottom: 8,
  },
  trailCard: {
    overflow: 'hidden',
  },
  trailCardHeader: {
    padding: 20,
    paddingBottom: 16,
  },
  trailCardHeaderText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  trailCardHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 4,
  },
  trailCardHeaderSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  trailCardBody: {
    padding: 16,
    paddingTop: 12,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroBanner: {
    width: '100%',
    height: undefined,
    aspectRatio: 1402 / 935,
  },
  heroTextBox: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  heroText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  heroHighlight: {
    color: '#F7931A',
    fontSize: 15,
    lineHeight: 22,
  },
  content: {
    padding: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  highlightText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    marginVertical: 24,
  },
  noNeedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  noNeedItem: {
    fontSize: 15,
    color: '#EF4444',
  },
  networkCard: {
    marginBottom: 12,
  },
  networkEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  networkTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  networkDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  trailBadge: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  trailBadgeText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  trailDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  guaranteeCard: {
    alignItems: 'center',
    marginTop: 20,
  },
  guaranteeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  guaranteeTitle: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  guaranteeDesc: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  manifestoCard: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    ...Platform.select({
      ios: { shadowColor: '#6366f1', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12 },
      android: { elevation: 6 },
    }),
  },
  manifestoTitle: {
    color: '#F7931A',
    fontSize: 20,
    marginBottom: 16,
    lineHeight: 28,
  },
  manifestoText: {
    color: '#E5E5E5',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  manifestoHighlight: {
    color: '#6366f1',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  profileCard: {
    overflow: 'hidden',
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: 400,
  },
  profileName: {
    fontSize: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  subSectionTitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  familyCard: {
    overflow: 'hidden',
    marginBottom: 16,
  },
  familyImage: {
    width: '100%',
    height: 350,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 15,
  },
});
