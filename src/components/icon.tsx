type IconProps = {
  svg: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

const Icon = (props: IconProps) => {
  const colorClass = props.color ? ` icon-color-${props.color}` : ''
  const sizeClass = props.size ? ' ' + props.size : ''
  return <div className={`icon icon-${props.svg}${colorClass}${sizeClass}`}></div>
}

export default Icon
