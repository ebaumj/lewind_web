<template>
    <div>
      <Suspense>
          <StationDetailView :id="stationId" />
          <template #fallback>
              <h1>Loading</h1>
          </template>
      </Suspense>
    </div>
</template>

<script setup>
  const { stationId } = useRoute().params
</script>
  