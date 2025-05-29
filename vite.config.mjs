import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [tailwindcss(), RubyPlugin(), flowbiteReact()],
})