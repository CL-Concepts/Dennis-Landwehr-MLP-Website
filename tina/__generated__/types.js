export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const EinstellungenPartsFragmentDoc = gql`
    fragment EinstellungenParts on Einstellungen {
  __typename
  name
  professionalTitle
  specialization
  city
  region
  phone
  phoneFormatted
  email
  address {
    __typename
    street
    zip
    city
    country
    full
  }
  bookingUrl
  mlpProfileUrl
  description
  navigation {
    __typename
    label
    href
    children {
      __typename
      label
      href
    }
  }
  buttons {
    __typename
    header
    mobile
    serviceCard
  }
  breadcrumbHome
  footer {
    __typename
    bookingButton
    contactTitle
    mlpLinkText
    legalTitle
    legalLinks {
      __typename
      label
      href
    }
    copyright
  }
  legal {
    __typename
    noticeTitle
    disclaimer
    personalSite
  }
  finalCta {
    __typename
    title
    text
    button
    note
  }
  servicePage {
    __typename
    breadcrumbParent
    atAGlanceTitle
    bookingButton
    contactLink
    authorPrefix
    authorName
    authorSuffix
    updatedPrefix
    relatedTitle
    faqTitle
  }
  notFound {
    __typename
    code
    title
    text
    homeButton
    bookingButton
  }
}
    `;
export const StartseitePartsFragmentDoc = gql`
    fragment StartseiteParts on Startseite {
  __typename
  seoTitle
  seoDescription
  hero {
    __typename
    eyebrow
    title
    lead
    text
    primaryButton
    secondaryButton
    trustItems
    image
    imageAlt
    badgeStatus
    badgeTitle
    badgeText
  }
  audiences {
    __typename
    title
    subtitle
    cards {
      __typename
      title
      description
      ctaText
      href
      image
      imageAlt
      icon
    }
  }
  services {
    __typename
    title
    subtitle
  }
  career {
    __typename
    eyebrow
    title
    subtitle
    phaseLabel
    nextButton
    phases {
      __typename
      label
      description
      detail
      topics
      hrefLabel
      href
      id
    }
  }
  profile {
    __typename
    title
    text
    image
    imageAlt
    primaryButton
    secondaryButton
    mlpPrefix
    mlpLinkText
  }
  process {
    __typename
    title
    steps {
      __typename
      number
      title
      description
    }
  }
  faq {
    __typename
    title
    items {
      __typename
      question
      answer
      id
      category
    }
  }
}
    `;
export const LeistungsuebersichtPartsFragmentDoc = gql`
    fragment LeistungsuebersichtParts on Leistungsuebersicht {
  __typename
  seoTitle
  seoDescription
  breadcrumb
  title
  subtitle
  phasesTitle
  phases {
    __typename
    title
    text
    linkText
    linkHref
  }
}
    `;
export const LeistungPartsFragmentDoc = gql`
    fragment LeistungParts on Leistung {
  __typename
  order
  title
  shortText
  highlights
  ctaText
  icon
  seoTitle
  seoDescription
  breadcrumb
  h1
  summary
  updatedAt
  atAGlance {
    __typename
    label
    value
  }
  sections {
    __typename
    heading
    bausteine {
      __typename
      ... on LeistungSectionsBausteineAbsatz {
        text
      }
      ... on LeistungSectionsBausteineListe {
        punkte
      }
      ... on LeistungSectionsBausteineKarten {
        karten {
          __typename
          titel
          text
        }
      }
      ... on LeistungSectionsBausteineNotiz {
        text
      }
      ... on LeistungSectionsBausteineHinweis {
        label
        text
      }
    }
  }
  calculator
  faqs {
    __typename
    question
    answer
    id
    category
  }
  relatedLinks {
    __typename
    label
    href
  }
}
    `;
export const StudierendePartsFragmentDoc = gql`
    fragment StudierendeParts on Studierende {
  __typename
  seoTitle
  seoDescription
  breadcrumb
  hero {
    __typename
    eyebrow
    title
    text
    primaryButton
    secondaryButton
    image
    imageAlt
  }
  notice {
    __typename
    label
    text
  }
  topics {
    __typename
    title
    subtitle
    linkText
    items {
      __typename
      title
      description
      href
    }
  }
  program {
    __typename
    title
    text
    items {
      __typename
      tag
      title
      text
      highlight
    }
    accessLabel
    accessText
  }
  areas {
    __typename
    title
    text
    requiredTitle
    required {
      __typename
      label
      text
    }
    optionalTitle
    optional {
      __typename
      label
      text
    }
  }
  process {
    __typename
    title
    steps {
      __typename
      step
      title
      text
    }
  }
  faq {
    __typename
    title
    items {
      __typename
      question
      answer
      id
      category
    }
  }
}
    `;
export const UeberMichPartsFragmentDoc = gql`
    fragment UeberMichParts on UeberMich {
  __typename
  seoTitle
  seoDescription
  breadcrumb
  image
  imageAlt
  contactTitle
  mlpLinkText
  eyebrow
  title
  text
  specializationTitle
  specializations
  activityTitle
  activityText
  button
  topicsTitle
  personal {
    __typename
    image
    imageAlt
    title
    text
  }
}
    `;
export const KontaktPartsFragmentDoc = gql`
    fragment KontaktParts on Kontakt {
  __typename
  seoTitle
  seoDescription
  breadcrumb
  title
  intro
  bookingTitle
  bookingText
  bookingButton
  phoneTitle
  emailTitle
  emailNote
  officeTitle
  officeNote
  profileTitle
  profileLinkText
}
    `;
export const RechtstextPartsFragmentDoc = gql`
    fragment RechtstextParts on Rechtstext {
  __typename
  order
  seoTitle
  seoDescription
  breadcrumb
  title
  warningTitle
  warningText
  sections {
    __typename
    heading
    style
    bausteine {
      __typename
      ... on RechtstextSectionsBausteineAbsatz {
        text
      }
      ... on RechtstextSectionsBausteineAnschrift {
        lines
        boldFirstLine
      }
    }
  }
}
    `;
export const RechnerPartsFragmentDoc = gql`
    fragment RechnerParts on Rechner {
  __typename
  eyebrow
  title
  subtitle
  tabBu
  tabWealth
  disclaimer
  wealth {
    __typename
    monthlyLabel
    yearsLabel
    rateLabel
    investedLabel
    gainLabel
    totalLabel
    chartStart
    chartEnd
    legendInvested
    legendGrowth
  }
  bu {
    __typename
    incomeLabel
    statusLegend
    statusStudium
    statusAngestellt
    statusSelbststaendig
    needLabel
    coverLabel
    gapLabel
    textStudium
    textAngestellt
    textSelbststaendig
    button
  }
}
    `;
export const EinstellungenDocument = gql`
    query einstellungen($relativePath: String!) {
  einstellungen(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EinstellungenParts
  }
}
    ${EinstellungenPartsFragmentDoc}`;
export const EinstellungenConnectionDocument = gql`
    query einstellungenConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EinstellungenFilter) {
  einstellungenConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EinstellungenParts
      }
    }
  }
}
    ${EinstellungenPartsFragmentDoc}`;
export const StartseiteDocument = gql`
    query startseite($relativePath: String!) {
  startseite(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StartseiteParts
  }
}
    ${StartseitePartsFragmentDoc}`;
export const StartseiteConnectionDocument = gql`
    query startseiteConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StartseiteFilter) {
  startseiteConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StartseiteParts
      }
    }
  }
}
    ${StartseitePartsFragmentDoc}`;
export const LeistungsuebersichtDocument = gql`
    query leistungsuebersicht($relativePath: String!) {
  leistungsuebersicht(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...LeistungsuebersichtParts
  }
}
    ${LeistungsuebersichtPartsFragmentDoc}`;
export const LeistungsuebersichtConnectionDocument = gql`
    query leistungsuebersichtConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LeistungsuebersichtFilter) {
  leistungsuebersichtConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...LeistungsuebersichtParts
      }
    }
  }
}
    ${LeistungsuebersichtPartsFragmentDoc}`;
export const LeistungDocument = gql`
    query leistung($relativePath: String!) {
  leistung(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...LeistungParts
  }
}
    ${LeistungPartsFragmentDoc}`;
export const LeistungConnectionDocument = gql`
    query leistungConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LeistungFilter) {
  leistungConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...LeistungParts
      }
    }
  }
}
    ${LeistungPartsFragmentDoc}`;
export const StudierendeDocument = gql`
    query studierende($relativePath: String!) {
  studierende(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StudierendeParts
  }
}
    ${StudierendePartsFragmentDoc}`;
export const StudierendeConnectionDocument = gql`
    query studierendeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StudierendeFilter) {
  studierendeConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StudierendeParts
      }
    }
  }
}
    ${StudierendePartsFragmentDoc}`;
export const UeberMichDocument = gql`
    query ueberMich($relativePath: String!) {
  ueberMich(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...UeberMichParts
  }
}
    ${UeberMichPartsFragmentDoc}`;
export const UeberMichConnectionDocument = gql`
    query ueberMichConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: UeberMichFilter) {
  ueberMichConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...UeberMichParts
      }
    }
  }
}
    ${UeberMichPartsFragmentDoc}`;
export const KontaktDocument = gql`
    query kontakt($relativePath: String!) {
  kontakt(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...KontaktParts
  }
}
    ${KontaktPartsFragmentDoc}`;
export const KontaktConnectionDocument = gql`
    query kontaktConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: KontaktFilter) {
  kontaktConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...KontaktParts
      }
    }
  }
}
    ${KontaktPartsFragmentDoc}`;
export const RechtstextDocument = gql`
    query rechtstext($relativePath: String!) {
  rechtstext(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...RechtstextParts
  }
}
    ${RechtstextPartsFragmentDoc}`;
export const RechtstextConnectionDocument = gql`
    query rechtstextConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: RechtstextFilter) {
  rechtstextConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...RechtstextParts
      }
    }
  }
}
    ${RechtstextPartsFragmentDoc}`;
export const RechnerDocument = gql`
    query rechner($relativePath: String!) {
  rechner(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...RechnerParts
  }
}
    ${RechnerPartsFragmentDoc}`;
export const RechnerConnectionDocument = gql`
    query rechnerConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: RechnerFilter) {
  rechnerConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...RechnerParts
      }
    }
  }
}
    ${RechnerPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    einstellungen(variables, options) {
      return requester(EinstellungenDocument, variables, options);
    },
    einstellungenConnection(variables, options) {
      return requester(EinstellungenConnectionDocument, variables, options);
    },
    startseite(variables, options) {
      return requester(StartseiteDocument, variables, options);
    },
    startseiteConnection(variables, options) {
      return requester(StartseiteConnectionDocument, variables, options);
    },
    leistungsuebersicht(variables, options) {
      return requester(LeistungsuebersichtDocument, variables, options);
    },
    leistungsuebersichtConnection(variables, options) {
      return requester(LeistungsuebersichtConnectionDocument, variables, options);
    },
    leistung(variables, options) {
      return requester(LeistungDocument, variables, options);
    },
    leistungConnection(variables, options) {
      return requester(LeistungConnectionDocument, variables, options);
    },
    studierende(variables, options) {
      return requester(StudierendeDocument, variables, options);
    },
    studierendeConnection(variables, options) {
      return requester(StudierendeConnectionDocument, variables, options);
    },
    ueberMich(variables, options) {
      return requester(UeberMichDocument, variables, options);
    },
    ueberMichConnection(variables, options) {
      return requester(UeberMichConnectionDocument, variables, options);
    },
    kontakt(variables, options) {
      return requester(KontaktDocument, variables, options);
    },
    kontaktConnection(variables, options) {
      return requester(KontaktConnectionDocument, variables, options);
    },
    rechtstext(variables, options) {
      return requester(RechtstextDocument, variables, options);
    },
    rechtstextConnection(variables, options) {
      return requester(RechtstextConnectionDocument, variables, options);
    },
    rechner(variables, options) {
      return requester(RechnerDocument, variables, options);
    },
    rechnerConnection(variables, options) {
      return requester(RechnerConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4002/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
