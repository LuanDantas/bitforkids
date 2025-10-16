import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
} from 'lucide-react-native';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    rating: number;
    students: number;
    duration: string;
    lessons: number;
    price: string;
    isFree?: boolean;
    level: string;
    category: string;
  };
  onPress: () => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return '#10B981';
      case 'Intermediário':
        return '#F59E0B';
      case 'Avançado':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.8)', 'rgba(59, 130, 246, 0.8)']}
          style={styles.imageOverlay}
        >
          <Play size={24} color="white" />
        </LinearGradient>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {course.title}
          </Text>
          <View
            style={[
              styles.levelBadge,
              { backgroundColor: `${getLevelColor(course.level)}20` },
            ]}
          >
            <Text
              style={[
                styles.levelText,
                { color: getLevelColor(course.level) },
              ]}
            >
              {course.level}
            </Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>
        
        <Text style={styles.instructor}>{course.instructor}</Text>
        
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.infoText}>{course.rating}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Users size={14} color="#9CA3AF" />
            <Text style={styles.infoText}>{course.students}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Clock size={14} color="#9CA3AF" />
            <Text style={styles.infoText}>{course.duration}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <BookOpen size={14} color="#9CA3AF" />
            <Text style={styles.infoText}>{course.lessons} aulas</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.price}>{course.price}</Text>
          <TouchableOpacity style={styles.enrollButton}>
            <LinearGradient
              colors={course.isFree ? ['#10B981', '#059669'] : ['#8B5CF6', '#3B82F6']}
              style={styles.enrollGradient}
            >
              <Text style={styles.enrollText}>
                {course.isFree ? 'Acessar Grátis' : 'Inscrever-se'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Free course indicator */}
      {course.isFree && (
        <View style={styles.freeIndicator}>
          <Text style={styles.freeText}>🆓 GRÁTIS</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imageContainer: {
    width: 100,
    height: 120,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 12,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  instructor: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 12,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  enrollButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  enrollGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  enrollText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  freeIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  freeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});