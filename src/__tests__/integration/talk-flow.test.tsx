// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {
//   mockTalk,
//   mockTalkWithComments,
// } from "@/__tests__/fixtures/talk.fixture";
// import TalkPage from "@/modules/react/pages/TalkPage";
// import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
// import { describe, it, expect, vi, beforeEach } from "vitest";

// // Mock Next.js routing
// vi.mock("next/navigation", () => ({
//   useParams: () => ({
//     id: mockTalk.id,
//     title: mockTalk.title,
//   }),
//   useRouter: () => ({
//     push: vi.fn(),
//     back: vi.fn(),
//     forward: vi.fn(),
//   }),
// }));

// vi.mock("@/modules/core/gateway-infra/api.talk-gateway");

// describe("Flux de création et interaction avec un Talk", () => {
//   const queryClient = new QueryClient();

//   const wrapper = ({ children }: { children: React.ReactNode }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );

//   beforeEach(() => {
//     vi.mocked(talkGateway.getTalkWithComments).mockResolvedValue(
//       mockTalkWithComments
//     );
//   });

//   it("devrait permettre de créer un talk et ajouter un commentaire", async () => {
//     render(<TalkPage />, { wrapper });

//     // Vérification du chargement initial
//     await waitFor(() => {
//       expect(screen.getByText(mockTalkWithComments.title)).toBeInTheDocument();
//     });

//     // Test d'ajout d'un commentaire
//     const commentButton = screen.getByText("Ajouter un commentaire");
//     fireEvent.click(commentButton);

//     const commentInput = screen.getByPlaceholderText("Votre commentaire");
//     fireEvent.change(commentInput, {
//       target: { value: "Nouveau commentaire" },
//     });

//     const submitButton = screen.getByText("Publier");
//     fireEvent.click(submitButton);

//     // Vérification que le commentaire a été ajouté
//     await waitFor(() => {
//       expect(screen.getByText("Nouveau commentaire")).toBeInTheDocument();
//     });
//   });
// });
