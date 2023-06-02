<script lang="ts">
    import dayjs from 'dayjs'
  
    export let format: string = 'YYYY-MM-DD'
    export let date: Date = new Date()
    export let id: string;
      
    let internal:any;
  
    const input = (x:Date) => (internal = dayjs(x).format(format))
    const output = (x:Date) => (date = dayjs(x, format).toDate())
  
    $: input(date)
    $: output(internal)
  </script>
  
  <input type="date" id={id} bind:value={internal} />