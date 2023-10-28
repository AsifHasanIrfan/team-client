import Button from '@components/Button';
import { InternshipModalProps } from '@config/types';
import Link from 'next/link';
import React from 'react';
import { BsArrowRight, BsExclamationCircle } from 'react-icons/bs';

function InternshipMainSection({ setIsOpen }: InternshipModalProps) {
  return (
    <main className="p-[30px] bg-white rounded-xl font-primary mb-[80px]">
      <div className="internShipMain md:w-[90%]">
        <h4>Job Description</h4>
        <h6 className="md:pl-5">
          Accenture Summer Analyst (Internship) Program
        </h6>
        <Space />
        <p className="md:pl-5">
          Kickstart your consulting career by joining one of Accenture’s Summer
          Analyst (Internship) Development Programs*. Leverage your skills and
          strengths to help our clients solve their most pressing business
          challenges, embracing the latest technology to become the next best
          version of themselves.
          <Space />
          Not only will you have amazing opportunities to learn, develop and
          grow your skills, you will join a collaborative environment that
          unleashes innovation, allows our people to perform at their very best
          and supports a culture in which everyone feels they have an equal
          opportunity to belong and build a career.
          <Space />
          If you have not previously considered Accenture; now is the time.
          Wherever your professional passions lie, there’s a home for you within
          one of Accenture’s Summer Analyst (Internship) Development Programs.
          <Space />
          *Internship program starts in June and runs approximately 10 weeks
          <Space />
          Looking to expand your technical skills and work with emerging
          technologies? Check out the
        </p>
        <Space />
        <h5>Technology Development Program:</h5>
        <ul>
          <li>
            Create and deliver platform and custom-designed solutions for world
            class clients.
          </li>
          <li>
            Build new business models via application management and
            implementation services.
          </li>
          <li>
            Co-create proof of concept for new or emerging technologies with our
            clients.
          </li>
          <li>
            Utilize programming skills to design and build client applications
            to drive and accelerate business impact.
          </li>
          <li>
            Discover vulnerabilities or security flaws to help our clients
            protect their information, applications, and business processes
            against cyber threats.
          </li>
        </ul>
        <Space />
        <p>
          Looking to help clients sustainably reimagine how their products are
          designed, manufactured and serviced in the engineering and
          manufacturing space? Check out the
        </p>

        <Space />

        <h5>Consulting Development Program:</h5>

        <ul>
          <li>
            Deliver new technologies and unique business solutions to world
            class clients
          </li>
          <li>
            Provide management support and analyze/improve business processes
          </li>
          <li>Develop change management and organizational strategies </li>
          <li>Build front-end solutions or design and implement software </li>
          <li>
            Use quantitative methods and statistical models to create insights,
            patterns, and outcomes from data
          </li>
          <li>
            Use quantitative methods and statistical models to create insights,
            patterns, and outcomes from data
          </li>
        </ul>
        <Space />
        <p>
          Looking to help clients sustainably reimagine how their products are
          designed, manufactured and serviced in the engineering and
          manufacturing space? Check out the
        </p>
        <Space />
        <h5>Industry X Development Program:</h5>

        <ul>
          <li>
            Make an impact and unlock value for our clients by being a trusted
            advisor with a strategic mindset, solving their most complex
            problems, and identifying opportunities across the digital value
            chain.
          </li>
          <li>
            Inspire change through process transformation, product design, build
            and delivery.
          </li>
          <li>
            Learn to leverage capabilities such as AI, Machine Learning,
            IoT/Edge Computing, Wifi/5G Connections, Augmented Reality,
            Wearables, Cloud Platforms, Cyber Security, Digital Twin and Thread
            and Robotics, Design Thinking and Research Methodologies.
          </li>
          <li>
            Increase production reliability, product quality, worker safety and
            sustainable operations with a more productive digital workforce.
          </li>
          <li>
            Enable our clients to drive growth, efficiency and more sustainable
            outcomes.
          </li>
        </ul>
        <Space />
        <p>
          Looking for somewhere to implement your creativity and improve digital
          experiences? Check out the
        </p>
        <Space />
        <h5>Song Development Program:</h5>

        <ul>
          <li>
            Design experiences that make people&apos;s lives better by
            reimagining industries, value propositions, products, services, and
            operating models
          </li>
          <li>
            Build experiences by rewiring organizations with connected platforms
            and intelligence to enable customer-centric business process and
            culture
          </li>
          <li>
            Communicate experiences to reach all audiences with bold ideas and
            marketing across every touchpoint{' '}
          </li>
          <li>
            Run experiences by optimizing marketing programs in a complex world
            through new service models
          </li>
          <li>
            Leverage our alliances with leading companies - such as SAP, Adobe,
            Salesforce, IBM, among others – to drive and accelerate real
            business impact
          </li>
        </ul>
        <Space />

        <p>
          The work location for this role can include a mix of working remotely
          and working onsite with our clients and partners or in our offices and
          delivery centers to enable delivery and cultivate our client
          relationships.
          <Space />
          Please note that with all of our roles, you should expect some
          in-person time for collaboration, learning and building relationships
          with clients, peers, leaders and communities. As an employer, we will
          be as flexible as possible to support your specific work/life needs.
        </p>
        <Space />
        <h4>Qualifications</h4>
        <h5 className="!mb-1">Required Qualifications:</h5>
        <p className="!mb-1">
          Pursuing a Bachelor or Master degree in any major (with a graduation
          date of December 2023 or later)
        </p>
        <h5 className="!mb-1">Preferred Qualifications:</h5>
        <h5>Technology Development Program</h5>
        <ul>
          <li>
            Experience with programming languages (ex. Java, Python, Ruby,
            etc.), modern frameworks (ex. Angular.js, Node.js, etc.) and/or
            lifecycle data management, supply chain, finance, etc.
          </li>
          <li>
            Exposure to programming-related projects in Web Design, Game design
            and/or Mobile Application Design.
          </li>
          <li>
            Interest in new emerging technologies such as Cloud, Security,
            Silicon and leading business application packages.
          </li>
          <li>
            Ability to demonstrate a strong work ethic, solid technical
            aptitude, excellent communication skills, leadership, attention to
            detail and experience working on a team.
          </li>
          <li>
            Leverage our alliances with leading companies - such as SAP, Adobe,
            Salesforce, IBM, among others – to drive and accelerate real
            business impact{' '}
          </li>
        </ul>
        <Space />
        <h5>Consulting Development Program</h5>
        <ul>
          <li>
            Familiarity with core consulting skills – business processes,
            organizational strategies, project management and an interest in
            technology.
          </li>
          <li>
            Ability to adjust quickly and confidently when faced with change,
            engage and enables team members to reach a common goal, seek out
            answers, drive solutions and get results, and follow through on what
            you say you’ll do, while also knowing when to ask for help.
          </li>
        </ul>
        <Space />
        <h5>Song Development Program</h5>
        <ul>
          <li>
            Experience with programming languages (ex. Java, JavaScript, etc.),
            modern frameworks (ex. Angular, React, Node, Spring, etc.) and/or
            design thinking, user story mapping, etc.
          </li>
          <li>
            Exposure to programming-related projects in Mobile Application
            Design (iOS, Swift, Android).
          </li>
          <li>
            Ability to demonstrate a strong work ethic, solid technical
            aptitude, excellent communication skills, leadership, attention to
            detail, and experience working on a team.
          </li>
        </ul>
        <Space />
        <p>
          As required by Colorado law under the Equal Pay for Equal Work Act,
          Accenture provides a reasonable range of compensation for roles that
          may be hired in Colorado. Actual compensation is influenced by a wide
          array of factors including but not limited to skill set, level of
          experience, and specific office location. For the state of Colorado
          only, the range of starting pay for this role is $25.00hr to $35.00hr
          information on benefits offered is here.
        </p>
        <Space />
        <h4>What We Believe</h4>

        <p>
          We have an unwavering commitment to diversity with the aim that every
          one of our people has a full sense of belonging within our
          organization. As a business imperative, every person at Accenture has
          the responsibility to create and sustain an inclusive environment.
          <Space />
          Inclusion and diversity are fundamental to our culture and core
          values. Our rich diversity makes us more innovative and more creative,
          which helps us better serve our clients and our communities.
        </p>
        <Space />

        <h5>Equal Employment Opportunity Statement</h5>

        <p>
          Accenture is an Equal Opportunity Employer. We believe that no one
          should be discriminated against because of their differences, such as
          age, disability, ethnicity, gender, gender identity and expression,
          religion or sexual orientation.
          <Space />
          All employment decisions shall be made without regard to age, race,
          creed, color, religion, sex, national origin, ancestry, disability
          status, veteran status, sexual orientation, gender identity or
          expression, genetic information, marital status, citizenship status or
          any other basis as protected by federal, state, or local law.
          <Space />
          Accenture is committed to providing veteran employment opportunities
          to our service men and women.
        </p>
        <Space />

        <h5>Requesting An Accommodation</h5>

        <p>
          Accenture is committed to providing equal employment opportunities for
          persons with disabilities or religious observances, including
          reasonable accommodation when needed. If you are hired by Accenture
          and require accommodation to perform the essential functions of your
          role, you will be asked to participate in our reasonable accommodation
          process. Accommodations made to facilitate the recruiting process are
          not a guarantee of future or continued accommodations once hired.
          <Space />
          If you would like to be considered for employment opportunities with
          Accenture and have accommodation needs for a disability or religious
          observance, please call us toll free at 1 (877) 889-9009, send us an
          email or speak with your recruiter.
        </p>
        <Space />

        <h5>Other Employment Statements</h5>

        <p>
          Applicants for employment in the US must have work authorization that
          does not now or in the future require sponsorship of a visa for
          employment authorization in the United States.
          <Space />
          Candidates who are currently employed by a client of Accenture or an
          affiliated Accenture business may not be eligible for consideration.
          <Space />
          Job candidates will not be obligated to disclose sealed or expunged
          records of conviction or arrest as part of the hiring process.
          <Space />
          The Company will not discharge or in any other manner discriminate
          against employees or applicants because they have inquired about,
          discussed, or disclosed their own pay or the pay of another employee
          or applicant. Additionally, employees who have access to the
          compensation information of other employees or applicants as a part of
          their essential job functions cannot disclose the pay of other
          employees or applicants to individuals who do not otherwise have
          access to compensation information, unless the disclosure is (a) in
          response to a formal complaint or charge, (b) in furtherance of an
          investigation, proceeding, hearing, or action, including an
          investigation conducted by the employer, or (c) consistent with the
          Company&apos;s legal duty to furnish information.
        </p>
      </div>
      <div className="mt-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <Link href="internship/internshipApply">
          <Button className="w-fit md:w-auto" endIcon={<BsArrowRight />}>
            Apply Now
          </Button>
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="flex gap-1.5 items-center text-primary hover:text-[#EA002E] duration-100 font-medium leading-6"
        >
          <BsExclamationCircle />
          <span className="leading-none">Register for Job alerts</span>
        </button>
      </div>
    </main>
  );
}

export default InternshipMainSection;

const Space = () => <span>&nbsp;</span>;
