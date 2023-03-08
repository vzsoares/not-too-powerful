// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { API_BASE } from 'env';

// import { authenticationHeader } from './utils/headers';
export {};
// export interface ClientTiny {
//   name: string;
//   id: number;
// }
// export interface AgrupamentoTiny {
//   name: string;
// }
// export interface EmpreditoTiny {
//   id: number;
//   nome: string;
// }
// export interface EmpreditoUnidadeDetails {
//   id: number;
//   empreendimentos_id: number;
//   disponibilidade: number;
//   tipo: string;
//   agrupamento: string;
//   andar: string;
//   garden: number;
//   luz_solar: string;
//   numero: string;
//   quartos: number;
//   banheiros: number;
//   suites: number;
//   vagas: number;
//   pne: number;
//   metragem: string;
//   valor_venda: string;
//   valor_aval: string;
//   comissao_corretor: string;
//   enquadramento: string;
//   pro_soluto: string;
//   anual_parcelas: number;
//   anual_regra: string;
//   pos_parcelas: number;
//   pos_regra: string;
//   mensal_parcelas: number;
//   mensal_regra: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string;
// }

// export const empreendimentoApi = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${API_BASE}/simulador/`,
//     prepareHeaders: authenticationHeader,
//   }),
//   reducerPath: 'empreendimento-api',
//   tagTypes: [],
//   endpoints: (builder) => ({
//     getEmpreendimentosList: builder.query<EmpreditoTiny[], unknown>({
//       query: () => `empreendimentos/`,
//     }),
//     getEmpreditoAgrupamentosList: builder.query<AgrupamentoTiny[], number>({
//       query: (empreditoId: number) =>
//         `agrupamentos?empreeendimentoId=${empreditoId}`,
//     }),
//     getEmpreditoUnidadesList: builder.query<
//       EmpreditoUnidadeDetails[],
//       { empreditoId: number; agrupamento: string }
//     >({
//       query: ({ empreditoId, agrupamento }) =>
//         `unidades?empreeendimentoId=${empreditoId}&agrupamento=${agrupamento}`,
//     }),
//   }),
// });

// export const {
//   useGetEmpreendimentosListQuery,
//   useGetEmpreditoAgrupamentosListQuery,
//   useGetEmpreditoUnidadesListQuery,
// } = empreendimentoApi;
