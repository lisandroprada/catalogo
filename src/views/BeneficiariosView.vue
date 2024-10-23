<template>
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:text-center">
                <h2 class="text-base font-semibold leading-7 text-indigo-600">
                    Beneficiarios
                </h2>
                <p
                    class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                >
                    Quiénes pueden acceder al préstamo
                </p>
                <p class="mt-6 text-lg leading-8 text-gray-600">
                    El préstamo está disponible para diferentes perfiles de
                    clientes, ofreciendo oportunidades a una amplia gama de
                    solicitantes.
                </p>
            </div>
            <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl
                    class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16"
                >
                    <div class="relative pl-16">
                        <dt
                            class="text-base font-semibold leading-7 text-gray-900"
                        >
                            <div
                                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
                            >
                                <svg
                                    class="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                    />
                                </svg>
                            </div>
                            Clientes BCH
                        </dt>
                        <dd class="mt-2 text-base leading-7 text-gray-600">
                            Clientes que cobren sus haberes en BCH.
                        </dd>
                    </div>
                    <div class="relative pl-16">
                        <dt
                            class="text-base font-semibold leading-7 text-gray-900"
                        >
                            <div
                                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
                            >
                                <svg
                                    class="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                                    />
                                </svg>
                            </div>
                            Independientes
                        </dt>
                        <dd class="mt-2 text-base leading-7 text-gray-600">
                            Clientes con actividades económicas independientes.
                        </dd>
                    </div>
                    <div class="relative pl-16">
                        <dt
                            class="text-base font-semibold leading-7 text-gray-900"
                        >
                            <div
                                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"
                            >
                                <svg
                                    class="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                                    />
                                </svg>
                            </div>
                            Relación de dependencia
                        </dt>
                        <dd class="mt-2 text-base leading-7 text-gray-600">
                            Personas en relación de dependencia sin acreditación
                            de haberes en BCH.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>
