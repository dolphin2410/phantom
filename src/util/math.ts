export const generate_random_hash = (size: number) => {
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('')
}