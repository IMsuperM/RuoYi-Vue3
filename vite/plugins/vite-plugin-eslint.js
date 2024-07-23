import eslintPlugin from 'vite-plugin-eslint';
export default function createEslintPlugin() {
    return eslintPlugin({
        cache: true,
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    })
}