import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElLink
} from 'element-plus'
const components = [
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElLink
]

export default function registerApp(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
