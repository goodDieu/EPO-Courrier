// src/components/stats/Sparkline.jsx
// Mini-courbe SVG pur, sans dépendance.

export default function Sparkline({
    data = [],
    color = '#009A44',
    width = 120,
    height = 32,
    strokeWidth = 1.5,
    fill = true,
}) {
    if (!data.length) return null;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const stepX = width / (data.length - 1 || 1);
    const points = data.map((v, i) => {
        const x = i * stepX;
        const y = height - ((v - min) / range) * height;
        return [x, y];
    });

    const linePath = points
        .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
        .join(' ');

    const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
    const gradId = `spark-grad-${color.replace('#', '')}`;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="block"
        >
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            {fill && <path d={areaPath} fill={`url(#${gradId})`} />}
            <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}