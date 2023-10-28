import Link from 'next/link'
import React from 'react'

type Props = {}

const New = (props: Props) => {

    return (
        <div className=''>
            <div className='px-7'>


                <h2 className='text-center text-[26px] font-bold underline uppercase'> DIGITAL GREGG TEAM MEMBER Agreement</h2>

                <p className='mt-[20px]'>{`This Independent Contractor Agreement (this "Agreement") is made effective as of  January 01, 2023, by and between Digital Gregg LLC, of 445 Hamilton Ave, White Plains, New York 10601, and the contractor (referred to as the "Team Member"). In this Agreement, the company that is contracting to receive the services shall be referred to as "Digital Gregg LLC", and the person who will be providing the services shall be referred to as "Teeam Member." This contract agreement specifies the rights, and privileges of an team member granted under the labor laws of Bangladesh and also the responsibilities expected to be completed from his/her end, in accordance with Bangladesh Labour Act 2006. The team member  has agreed to the following:`}</p>

                <h3 className='text-[22px] font-bold my-4'>Position</h3>

                <ul className='list-disc px-6'>
                    <li>Team Member: will work at least 6 days per week. <b> 9am - 5pm(Time could be changed based on US time changing but BD time 7pm will be same)</b>
                    </li>
                </ul>

                <p className='my-4'><b>{`Drawbacks are as follows: Drawbacks cannot exceed more than 75% of your total monthly salary. It is the Team Member's responsibility to have their phone, computer, laptop, or any device that is needed to complete his/her responsibilities, charged, working, and available at all times during working hours.`}</b></p>


                <p className='mb-2'><b>1. Arriving late to morning meeting (Morning Drawback)</b></p>

                <ul className='list-disc px-6'>
                    <li className='my-1'>You are allowed up to 5min late. In this way, you must need to let us know before 7pm (Bangladesh Standard Time GMT+6). To avoid the drawbacks for being more than 5 mins late, you must let us know at least 30 mins before.
                    </li>
                    <li className='my-1'>Going to Another Room during role call. Team members must be in the main room for roll call. If you go to another room without being in roll call, the team member will be counted as being late to the morning meeting and a Morning Drawback will apply.
                    </li>
                    <li className='my-1'>If a worker is in the meeting but not near the microphone for roll call, it will count as you are late to the morning meeting.
                    </li>
                    <li className='my-1'>If you are unable to join the morning meeting because of connection issues, you must let us know using mobile data on WhatsApp 15 minutes before. If you continue to have connection issues or any other issues for more than 3 days in one week, (Monday-Sunday), Even after letting us know 15 mins before, drawback penalties will apply, starting on the third day. If the phone is dead or you are unable to send a message you will be held responsible and will get drawbacks.
                    </li>
                </ul>


                <p className='mb-2 mt-5'><b>2. Missed Days (Missed day Drawback)</b></p>

                <p>The team members must let us know before 7 days for any additional off days. If the team member fails to inform us before 7 days, the missed day drawback will apply to their account. We will only accept medical emergencies if you can’t let us know after 7 days. In this way, the team members need to show the hospital papers within 3 days; otherwise, the drawback will apply to their accounts
                </p>

                <p className='mb-2 mt-5'><b>3. No Work</b></p>

                <p>The team member must need to inform that he is out of the task. Without informing us and we notice that you are on Facebook or any other unnecessary site for more than 1 hour a day, the drawback will apply to your account. </p>

                <p className='mb-2 mt-5'><b>4. (Leave Early Drawbacks) </b></p>

                <p>The team member must complete 8 hours a day during the scheduled time. once somebody will failed to complete the shift, they can have extra 1 hours to made up. In this way, they need to contact an administrator to enable the extra time shift. Not completed 8 hours shift, the drawback will apply to their account. Also, before you leave meet for the day, you must type into your WhatsApp group what you did and all tasks completed for that day. If the Worked miss typing what he/she did on the day, the Worker will receive a drawback for that day.</p>

                <p className='mb-2 mt-5'><b>Drawback when a team member has no DG coins.</b></p>
                <p>{`If the team member doesn’t have any DG coins in their account.  The drawback will subtract from their monthly salary. `}</p>

                <p className='mb-2 mt-5'><b>Rewards/Benefits</b></p>
                <p>The team member will receive a few benefits, which they will be able to obtain by using DG coins. Which is detailed below:</p>

                <ul className='list-disc px-6'>
                    <li className='my-1'>
                        1 Offday (offday without be an apporved would be charge 3500 DG coins)
                    </li>
                    <li className='my-1'>
                        Increase monthly salary by $50 (This can only be done once every 2 months)
                    </li>
                    <li className='my-1'>
                        Increase monthly salary by $200 (This can only be done once every 4 months)
                    </li>
                    <li className='my-1'>
                        Increase monthly salary by $500 (This can only be done once every 6 months)
                    </li>
                    <li className='my-1'>
                        Increase monthly salary by $1000 (This can only be done once every 6 months)
                    </li>
                    <li className='my-1'>
                        Instant money(This money will be added to your current month salary)  $25  (This can only be done once every 2 months)
                    </li>
                    <li className='my-1'>
                        Instant money(This money will be added to your current month salary)  $50 (This can only be done once every 4 months)

                    </li>
                    <li className='my-1'>
                        Instant money(This money will be added to your current month salary)  $50  (This can  be done unlimited times)
                    </li>
                    <li className='my-1'>
                        Instant money(This money will be added to your current month salary)  $100  (This can only be done once every 6 months)

                    </li>
                    <li className='my-1'>
                        Instant money(This money will be added to your current month salary)  $100  (This can  be done unlimited times)

                    </li>
                    <li className='my-1'>
                        Instant money(This money will be added to your current month salary)  $500   (This can only be done once every 8 months)
                    </li>
                    <li className='my-1'>
                        Instant money(This money will be added to your current month salary)  $1000  (This can only be done once every 12 months)

                    </li>
                    <li className='my-1'>
                        Instant money(This money will be added to your current month salary)  $1000 (This can  be done unlimited times)

                    </li>
                    <li className='my-1'>
                        1-week All expense paid trip to USA, France, UK, Japan, or Canada  includes flight, hotel, food, passport, travel, clothes, car rides, events, venues, and all other purchases.  (This can only be done once every 12 months)

                    </li>
                    <li className='my-1'>
                        1on1 30 minute session with Gregg to improve your skills in UI/UX Design, Freelancer Career or Business

                    </li>
                    <li className='my-1'>
                        Company Package (includes team member ID card, certificate of employment, DG logo polo shirt, Android 32G pc Tablet, DG pen, DG business card, and DG Coffee Cup) Unlocks after working 7 months (must be current  team member and avoid 1 week warning at least for 3 month )in the company

                    </li>
                    <li className='my-1'>
                        Access to all DG resources for 1 month ($1957 value) can use for personal usage.

                    </li>
                    <li className='my-1'>
                        {`M1 Chip Apple Macbook 32G  16' Laptop.`}
                    </li>
                    <li className='my-1'>
                        Skill Courses (provided by Coursera, google, and Digital gregg, will earn certificate after successful completion).

                    </li>
                    <li className='my-1'>
                        Skills Test to increase monthly salary based on skills Provided by TestGorilla.com - 100% = $200, 90%+ = $100, 80%+ = half DG coins back  (only available to current members)

                    </li>
                    <li className='my-1'>
                        10% increase on all DG coin rewards, task rewards, team member of the month rewards, $$ rewards and achievement awards.

                    </li>
                    <li className='my-1'>
                        Forgive all my drawbacks for the month. (This can only be done once every 6 months)
                    </li>
                </ul>

                <p className='my-6'>Note: All benefits will be approved by text messages  </p>

                <p className='mb-2 mt-5'><b>Bookmark Meet and Chat links.</b></p>
                <p>Please save and bookmark all necessary links that are provided by Digital Gregg LLC.</p>

                <p className='mb-2 mt-5'><b>Worker Breaks</b></p>

                <p className='mb-2 mt-5'>Team Member</p>
                <ul className='list-disc px-6'>
                    <li>Team Members are allowed unlimited breaks of less than 10 minutes. If more than 10 minutes are needed, please inform us. You will receive a Late Meeting Drawback if you do not inform us. Keep Hubstaff tracking going during breaks.
                    </li>
                </ul>

                <p className='mb-2 mt-5'><b>Team Member Duration </b></p>

                <p className='mb-2 mt-5'>Team Member</p>
                <p> Work start time is 7:00 pm (Bangladesh Standard Time GMT+6)  and leaves at 3 am (Bangladesh Standard Time GMT+6).</p>

                <div>
                    <h4 className="font-medium text-2xl my-3">Holidays</h4>
                    <p>
                        The team member will receive 1 vacation day every 6 weeks and 1 sick
                        day every 6 weeks. If you do not have any sick days remaining, your
                        vacation days will be used.
                    </p>
                    <h4 className="font-medium text-2xl my-3">
                        Confidentiality and Data Protection
                    </h4>

                    <p>
                        The team member will receive 1 vacation day every 6 weeks and 1 sick
                        day every 6 weeks. If you do not have any sick days remaining, your
                        vacation days will be used.
                    </p>
                    <ul>
                        <li>team member records</li>
                        <li>Unpublished financial information</li>
                        <li>Data of customers/ partners/ vendors</li>
                        <li>projects (design and development etc)</li>
                        <li>Customers list (existing and prospective)</li>
                        <li>
                            Unpublished goals, forecasts, and initiatives are marked as
                            confidential.
                        </li>
                    </ul>
                    <p>
                        As part of our hiring process, you agree that Digital Gregg LLC can
                        sign non-compete and non-disclosure agreements (NDAs.) on your behalf
                        for all matters dealing with Digital Gregg LLC.{' '}
                    </p>
                    <h5>Ther Worker must not</h5>
                    <ul>
                        <li>
                            Use confidential information provided or owned by Digital Gregg LLC
                            for their personal benefit or profit.
                        </li>
                        <li>
                            Disclose confidential information to anyone outside of Digital Gregg
                            LLC
                        </li>
                        <li>
                            Replicate confidential documents and files of Digital Gregg LLC and
                            store them on insecure devices.
                        </li>
                    </ul>
                    <p>
                        This policy is important for our company’s legality and reputation. We
                        will terminate any team member who breaches our confidentiality
                        guidelines for personal profit.
                        <br></br>
                        <br></br>
                        We may also discipline any unintentional breach of this policy
                        depending on its frequency and seriousness. We will terminate team
                        members who repeatedly disregard this policy, even when they do so
                        unintentionally.
                        <br></br>
                        <br></br>
                        You will responsible for the payment of all damages and violations.
                        This is to ensure the integrity and safety of our brand, clients, and
                        personal data. As our safety & success is your safety & success.
                    </p>
                    <h4 className="font-medium text-2xl my-3">
                        Responsibilities of an team member
                    </h4>
                    <u>
                        <li>
                            team members will have the opportunity to learn and improve their
                            skills.
                        </li>
                        <li>
                            The manager should not discuss the following list with his team
                            member.
                        </li>
                    </u>
                    <p>a. About their salary</p>
                    <p>b. About Hubstaff problem</p>
                    <p className='mb-2'>c. Any kind of personal issues about their job</p>
                    <p>
                        Any of the above questions must be directed and only answered by us.
                    </p>
                    <p className="text-bold text-italic">
                        If you are out of tasks or they have finished the task middle of the
                        day, they must inform us immediately.
                    </p>
                    <p>
                        <strong>Stay on the meet</strong> Stay on the meet will help you make
                        the work done faster. We want you to improve your skills and make them
                        feel like you are in the office while it s a remote job.. If you lose
                        the connection middle of the day, you will have an extra 1 hour
                        complete your work. Time missed can be made up on other days as well.
                        Please refer to Connection Drawback.
                    </p>
                </div>

                <h3 className="font-bold pb-2">Payment</h3>
                <p>
                    Our regular payroll is at the end of the month on Friday in that given
                    week.
                </p>
                <p className="pb-4 pt-2">You can be paid by:</p>
                <ul className="ml-6 mb-5">
                    <ol>1. Your local bank</ol>
                    <ol>2. bkash</ol>
                </ul>
                <p>
                    You must allow up to 7 days for the full payment to be transferred into
                    your account. If after working with us for more than 6 months you can
                    request to be paid every 2 weeks. If after working with us for more than
                    12 months you can request to be paid every 1 week.
                </p>
                <div className="my-10">
                    <span className="font-bold">
                        Probationary Period for Trial team members
                    </span>
                    <p className="mt-6 font-bold">
                        According to Section 4(8) of the Labour Act, the period of probation
                        for a worker shall whose function is of a clerical nature shall be six
                        months, and for other workers such period shall be three months, in
                        the case of a skilled worker, the probation period may be extended for
                        a further period of three months if it is not possible to ascertain
                        the quality of work within the first three months of probation.{' '}
                    </p>
                </div>
                <div className="my-10">
                    <h4 className="font-bold mb-5">Termination Procedure</h4>
                    <span className="font-italic">Team Member</span>
                    <p>
                        Team Members will be required to give 30 days’ notice in writing to
                        Digital Gregg LLC before they leave. If leaving before the 30-day
                        period has been complete. Digital Gregg LLC has the right to withhold
                        or claim monthly salary for the last 30 days prior.{' '}
                    </p>
                </div>
                <div className="my-10">
                    <h4 className="font-bold pb-1">
                        If a worker quits without giving a 30-day notice after receiving their
                        payment
                    </h4>
                    <p className='my-2'>
                        1. After 48 hours, Digital Gregg LLC will send a formal invoice to the
                        Worker’s email we have on file. for return of payment to Digital Gregg
                        LLC for the last 30 days.
                    </p>
                    <p className='my-2'>
                        2. After 1 week of non-payment, Digital Gregg LLC will send an invoice reminder to the Worker’s email for the return of payment to Digital Gregg LLC for the last 30 days.
                    </p>
                    <p className='my-2'>
                        3. After 2 weeks of non-payment, Digital Gregg LLC will file a dispute claim with the Courts of Bangladesh for breach of contract, and failure to return payment for the last 30 days. The worker will be responsible for all court fess, filing fees, legal and lawyer fees, and process fees, according to Bangladesh Desh

                    </p>
                    <p className='my-2'>
                        4. After 3 weeks of non-payment, Digital Gregg LLC will file a police report against the Worker in response to the court claim for failure to return the payment to Digital Gregg LLC for the last 30 working days.

                    </p>
                </div>

                <p className='my-5'>If a worker is absent for more than three days without a response. He or she will be assumed to have quit  Before providing Digital Gregg LLC  their 30-day notice, Digital Gregg LLC has the right to withhold and claim monthly salary for the last 30 working days.

                    Digital Gregg LLC has the right to terminate any employment and cancel any agreement at any given time, it deems necessary.
                </p>

                <p className='font-bold my-4'>Dispute Resolution</p>
                <p className='my-4'>Where there is a breach of any clause on this contract on the part of the employer or the team member, parties shall seek redress through alternative dispute resolution and the Labour Courts of Bangladesh.
                </p>


            </div>
        </div >
    )
}

export default New