export const clean = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "")
}