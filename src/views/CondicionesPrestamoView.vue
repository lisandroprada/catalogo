<script setup lang="ts">
import { UsersIcon, UserGroupIcon } from "@heroicons/vue/24/outline";
</script>

<template>
    <div class="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:text-center">
                <h2
                    class="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400"
                >
                    Condiciones del Préstamo
                </h2>
                <p
                    class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
                >
                    Préstamos ajustados por UVA
                </p>
                <p
                    class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
                >
                    Los préstamos están ajustados por UVA y tienen una tasa
                    nominal anual (TNA) fija según los beneficiarios.
                </p>
            </div>
            <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl
                    class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
                >
                    <div class="relative pl-16">
                        <dt
                            class="text-base font-semibold leading-7 text-gray-900 dark:text-white"
                        >
                            <div
                                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
                            >
                                <UsersIcon
                                    class="h-6 w-6 text-white"
                                    aria-hidden="true"
                                />
                            </div>
                            Beneficiarios 1 y 2
                        </dt>
                        <dd
                            class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300"
                        >
                            TNA fija de 3,50%
                        </dd>
                    </div>
                    <div class="relative pl-16">
                        <dt
                            class="text-base font-semibold leading-7 text-gray-900 dark:text-white"
                        >
                            <div
                                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
                            >
                                <UserGroupIcon
                                    class="h-6 w-6 text-white"
                                    aria-hidden="true"
                                />
                            </div>
                            Beneficiarios 3
                        </dt>
                        <dd
                            class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300"
                        >
                            TNA fija de 8%
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>
