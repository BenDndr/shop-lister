import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextProps = TextProps & {
  light?: boolean
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'smalltitle';
  center?: boolean
};

export function ThemedText({
  style,
  light,
  type = 'default',
  center,
  ...rest
}: ThemedTextProps) {
  const color = light ? "white" : 'black';

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'smalltitle' ? styles.smalltitle: undefined,
        center && { textAlign: 'center' },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    lineHeight: 64,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  smalltitle: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
