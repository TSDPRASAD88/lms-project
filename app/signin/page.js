// app/signin/page.js
import SignInPage from '../../components/pages/signin-page'; // Note the new import name!

// This is a Server Component, but it renders the Client Component (SignInPage).

export default function SigninPage() {
  return (
    <SignInPage />
  );
}