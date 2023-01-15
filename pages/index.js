import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.data.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                  {post.data.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.data.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      
      <style type='text/css'>
        .embeddedServiceHelpButton .helpButton .uiButton {
          background-color: #005290;
          font-family: "Arial", sans-serif;
        }
        .embeddedServiceHelpButton .helpButton .uiButton:focus {
          outline: 1px solid #005290;
        }
      </style>

      <script type='text/javascript' src='https://service.force.com/embeddedservice/5.0/esw.min.js'></script>
      <script type='text/javascript'>
        var initESW = function(gslbBaseURL) {
          embedded_svc.settings.displayHelpButton = true; //Or false
          embedded_svc.settings.language = ''; //For example, enter 'en' or 'en-US'

          //embedded_svc.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
          //embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)

          //embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
          //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

          // Settings for Chat
          //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
            // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
            // Returns a valid button ID.
          //};
          //embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
          //embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
          //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

          embedded_svc.settings.enabledFeatures = ['LiveAgent'];
          embedded_svc.settings.entryFeature = 'LiveAgent';

          embedded_svc.init(
            'https://establishmentlabs--dev01.sandbox.my.salesforce.com',
            'https://establishmentlabs--dev01.sandbox.my.site.com/partner',
            gslbBaseURL,
            '00D0E000000HL8e',
            'testchat',
            {
              baseLiveAgentContentURL: 'https://c.la2-c1cs-fra.salesforceliveagent.com/content',
              deploymentId: '5720E000000CcOW',
              buttonId: '5730E0000008S16',
              baseLiveAgentURL: 'https://d.la2-c1cs-fra.salesforceliveagent.com/chat',
              eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I0E000000CbbYUAS_185b79643ed',
              isOfflineSupportEnabled: false
            }
          );
        };

        if (!window.embedded_svc) {
          var s = document.createElement('script');
          s.setAttribute('src', 'https://establishmentlabs--dev01.sandbox.my.salesforce.com/embeddedservice/5.0/esw.min.js');
          s.onload = function() {
            initESW(null);
          };
          document.body.appendChild(s);
        } else {
          initESW('https://service.force.com');
        }
      </script>
      
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
