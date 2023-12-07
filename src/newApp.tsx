import { emit } from "process";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            default: () => ''
        }
    },
    setup(props, ctx) {
        const newValue = ref('')
        const changeEmit = () => {
            ctx.emit('change', newValue.value)
        }
        return () => <div>
            <input type="text" v-model={newValue.value} />
            {newValue.value}
            <div>{props.name}</div>
            <button onClick={changeEmit}>点击emit事件</button>
        </div>
    },
})