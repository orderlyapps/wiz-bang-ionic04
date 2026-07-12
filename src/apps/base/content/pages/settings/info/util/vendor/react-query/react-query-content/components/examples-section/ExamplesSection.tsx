import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";

const queryCode = `import { useQuery } from "@util/vendor/react-query";

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>{data.name}</p>;
}`;

const mutationCode = `import { useMutation, useQueryClient } from "@util/vendor/react-query";

function CreatePost() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost: Post) =>
      fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ title: "New Post" })}>
      Create
    </button>
  );
}`;

export function ExamplesSection() {
  return (
    <IonAccordion value="examples">
      <IonItem slot="header">
        <IonLabel>Usage Examples</IonLabel>
      </IonItem>
      <div className="ion-padding" slot="content">
        <IonItem lines="none">
          <Body>
            <strong>Basic Query</strong>
          </Body>
        </IonItem>
        <IonItem lines="none">
          <pre
            style={{
              margin: 0,
              width: "100%",
              whiteSpace: "pre-wrap",
              fontSize: "0.8125rem",
            }}
          >
            {queryCode}
          </pre>
        </IonItem>

        <IonItem lines="none">
          <Body>
            <strong>Mutation</strong>
          </Body>
        </IonItem>
        <IonItem lines="none">
          <pre
            style={{
              margin: 0,
              width: "100%",
              whiteSpace: "pre-wrap",
              fontSize: "0.8125rem",
            }}
          >
            {mutationCode}
          </pre>
        </IonItem>
      </div>
    </IonAccordion>
  );
}
