import Button from '../components/storybook/Button/Button'
import { Icons } from '../components/storybook/icons/EmojiIcons'
import PageHeader from '../components/storybook/NavBar/PageHeade';
import logo from '../assets/mate-logo-green.png';

const ComponetsTests = () => {
  return (
  <>
    <PageHeader title='טופס בקשת סיוע' logo={logo} />
    <div className='components-tests'>
        <Button type="primary" btnText="Primary" />
        <Button type="secondary" btnText="Secondary" />
        <Button type="tertiary" btnText="Tertiary" />
        <Button type="transparent-on-light" btnText="Transparent on Light" />
        <Button type="transparent-on-dark" btnText="Transparent on Dark" />
        <Button type="icon-only" icon={Icons.search} />
        <Button type="close" icon={"X"} />
        <Button size="small" btnText="Small" />
        <Button size="medium" btnText="Medium" />
        <Button size="large" btnText="Large" />
        <Button fullWidth btnText="Full Width" type="primary" size="large" iconPosition='right' icon={Icons.search} />
        <Button isDisabled btnText="Disabled" />
        <Button iconPosition="right" btnText="Icon Right" icon={Icons.search} />
        <Button iconPosition="left" btnText="Icon Left" icon={Icons.search} />
    </div>
    </>
  )
}

export default ComponetsTests;