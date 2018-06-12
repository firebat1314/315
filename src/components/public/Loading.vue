<template>
	<div class="loading" style="">
		<vue-loading type="spiningDubbles" color="#ff651d" :size="{ width: '0.5rem', height: '0.5rem' }" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"></vue-loading>
	</div>
</template>

<script>
	import vueLoading from 'vue-loading-template'
	export default {
		name: 'load',
		components: {
			vueLoading
		},
		mounted() {

		},
		methods: {}
	}
</script>

<style scoped>
	.loading {
		width: 1rem;
		height: 1rem;
		/*background: #fff;*/
		/*box-shadow: 0 0 5px #eee;*/
		/*border-radius: 0.25rem;*/
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99999999;
	}
	
	.loading>>>svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>