import mkcert from "vite-plugin-mkcert";
// 开启https
export default function createMkcert() {
    return mkcert();
}
